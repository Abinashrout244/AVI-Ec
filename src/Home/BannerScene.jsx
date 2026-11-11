import React, { memo, useCallback, useEffect, useMemo, useRef } from "react";
import { Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, PerformanceMonitor, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

const GOLD = "#d9b55f";
const LILAC = "#c4a1f5";
const INK = "#070509";
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
const { lerp, clamp, damp } = THREE.MathUtils;

let glowTexture;
const getGlowTexture = () => {
  if (glowTexture) return glowTexture;
  const size = 128;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d");
  const grad = g.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.35, "rgba(255,255,255,0.32)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  glowTexture = new THREE.CanvasTexture(c);
  return glowTexture;
};

const spacedWidth = (ctx, text, spacing) =>
  [...text].reduce((w, ch) => w + ctx.measureText(ch).width + spacing, 0) -
  spacing;

const drawSpaced = (ctx, text, x, y, spacing) => {
  let cx = x;
  for (const ch of text) {
    ctx.fillText(ch, cx, y);
    cx += ctx.measureText(ch).width + spacing;
  }
  return cx - spacing;
};

const roundedRectPath = (g, x, y, w, h, r) => {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
};

const finishTexture = (canvas) => {
  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 4;
  tex.needsUpdate = true;
  return tex;
};

const makeLabelTexture = (label, price) => {
  const S = 3; // supersample for crisp text on retina
  const h = 60;
  const padX = 30;
  const gap = 18;
  const font = `500 20px ${MONO}`;
  const m = document.createElement("canvas").getContext("2d");
  m.font = font;
  const text = label.toUpperCase();
  const lw = spacedWidth(m, text, 3);
  const pw = spacedWidth(m, price, 3);
  const w = Math.ceil(padX * 2 + lw + gap * 2 + 1 + pw);

  const c = document.createElement("canvas");
  c.width = w * S;
  c.height = h * S;
  const g = c.getContext("2d");
  g.scale(S, S);

  roundedRectPath(g, 1, 1, w - 2, h - 2, (h - 2) / 2);
  g.fillStyle = "rgba(14,10,20,0.9)";
  g.fill();
  g.lineWidth = 1.2;
  g.strokeStyle = "rgba(255,255,255,0.22)";
  g.stroke();

  g.font = font;
  g.textBaseline = "middle";
  g.fillStyle = "rgba(255,255,255,0.66)";
  const endLabel = drawSpaced(g, text, padX, h / 2 + 1, 3);
  g.fillStyle = "rgba(255,255,255,0.22)";
  g.fillRect(endLabel + gap, h / 2 - 9, 1, 18);
  g.fillStyle = GOLD;
  g.font = `700 20px ${MONO}`;
  drawSpaced(g, price, endLabel + gap * 2 + 1, h / 2 + 1, 3);

  return { texture: finishTexture(c), aspect: w / h };
};

const makeHeaderTexture = (text, color) => {
  const S = 3;
  const h = 44;
  const font = `500 20px ${MONO}`;
  const m = document.createElement("canvas").getContext("2d");
  m.font = font;
  const tw = spacedWidth(m, text, 9);
  const w = Math.ceil(tw + 40);
  const c = document.createElement("canvas");
  c.width = w * S;
  c.height = h * S;
  const g = c.getContext("2d");
  g.scale(S, S);
  g.font = font;
  g.textBaseline = "middle";
  g.fillStyle = color;
  drawSpaced(g, text, 20, h / 2 + 1, 9);
  return { texture: finishTexture(c), aspect: w / h };
};

/* Camera-facing label drawn on the GPU (replaces <Html>, which re-layouts the DOM every frame). */
const Sprite = memo(({ position, width, make }) => {
  const { texture, aspect } = useMemo(make, [make]);
  useEffect(() => () => texture.dispose(), [texture]);
  return (
    <sprite
      position={position}
      scale={[width, width / aspect, 1]}
      renderOrder={5}
    >
      <spriteMaterial
        map={texture}
        transparent
        depthWrite={false}
        toneMapped={false}
        fog={false}
      />
    </sprite>
  );
});

const PriceTag = memo(({ position, label, price }) => {
  const make = useCallback(
    () => makeLabelTexture(label, price),
    [label, price],
  );
  return <Sprite position={position} width={2.5} make={make} />;
});

const SectionHeader = memo(({ position, text, color }) => {
  const make = useCallback(() => makeHeaderTexture(text, color), [text, color]);
  return <Sprite position={position} width={5.2} make={make} />;
});

/* ───────────────────────── light effects (cheap, no real spotlights) ───────────────────────── */

const FloorGlow = memo(
  ({ position, size = 5, color = "#fff1d6", opacity = 0.45 }) => (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]} renderOrder={1}>
      <planeGeometry args={[size, size]} />
      <meshBasicMaterial
        map={getGlowTexture()}
        color={color}
        transparent
        opacity={opacity}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  ),
);

const OverheadFixture = memo(({ color = "#fff6e3" }) => (
  <group position={[0, 4.8, 0]}>
    <mesh>
      <cylinderGeometry args={[0.2, 0.22, 0.4, 20]} />
      <meshStandardMaterial color="#221828" metalness={0.9} roughness={0.25} />
    </mesh>
    <mesh position={[0, -0.21, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <circleGeometry args={[0.18, 20]} />
      <meshBasicMaterial color={color} toneMapped={false} />
    </mesh>
    <mesh position={[0, -2.4, 0]}>
      <coneGeometry args={[1.4, 4.8, 24, 1, true]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.04}
        side={THREE.DoubleSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
        fog={false}
      />
    </mesh>
  </group>
));

/* ───────────────────────── SECTION 1: couture dress ───────────────────────── */

const DRESS_PROFILE = [
  [0.62, -0.56],
  [0.54, -0.36],
  [0.4, -0.12],
  [0.27, 0.12],
  [0.215, 0.26],
  [0.25, 0.42],
  [0.24, 0.58],
  [0.17, 0.72],
  [0.07, 0.8],
];

const useDressGeometry = () => {
  const geo = useMemo(() => {
    const curve = new THREE.SplineCurve(
      DRESS_PROFILE.map(([r, y]) => new THREE.Vector2(r, y)),
    );
    return new THREE.LatheGeometry(curve.getPoints(40), 48);
  }, []);
  useEffect(() => () => geo.dispose(), [geo]);
  return geo;
};

const MannequinDressDisplay = memo(
  ({
    position,
    label,
    price,
    spin,
    dressColor = "#1a1524",
    accentColor = GOLD,
    lightColor = "#fff3db",
  }) => {
    const spinRef = useRef();
    const dressGeo = useDressGeometry();

    useFrame((_, delta) => {
      if (spin && spinRef.current)
        spinRef.current.rotation.y += Math.min(delta, 0.05) * 0.32;
    });

    return (
      <group position={position}>
        <OverheadFixture color={lightColor} />

        {/* pedestal */}
        <mesh position={[0, -0.7, 0]}>
          <cylinderGeometry args={[0.9, 0.95, 1.4, 40]} />
          <meshStandardMaterial
            color="#0f0b15"
            metalness={0.85}
            roughness={0.25}
          />
        </mesh>
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.92, 0.92, 0.04, 40]} />
          <meshStandardMaterial
            color={accentColor}
            metalness={0.95}
            roughness={0.18}
          />
        </mesh>
        <mesh position={[0, 0.045, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.8, 0.01, 8, 64]} />
          <meshBasicMaterial color={accentColor} toneMapped={false} />
        </mesh>

        {/* stand */}
        <mesh position={[0, 0.7, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 1.4, 12]} />
          <meshStandardMaterial color={GOLD} metalness={0.9} roughness={0.2} />
        </mesh>

        {/* dress (turntable) */}
        <group ref={spinRef} position={[0, 1.3, 0]}>
          <mesh geometry={dressGeo}>
            <meshStandardMaterial
              color={dressColor}
              roughness={0.38}
              metalness={0.35}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh position={[0, 0.26, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.222, 0.013, 10, 48]} />
            <meshStandardMaterial
              color={GOLD}
              metalness={0.95}
              roughness={0.12}
            />
          </mesh>
          <mesh position={[0, -0.555, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.615, 0.009, 8, 64]} />
            <meshStandardMaterial
              color={GOLD}
              metalness={0.95}
              roughness={0.15}
            />
          </mesh>
          <mesh position={[0, 0.85, 0]}>
            <cylinderGeometry args={[0.055, 0.065, 0.15, 16]} />
            <meshStandardMaterial
              color={GOLD}
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>
          <mesh position={[0, 0.96, 0]}>
            <sphereGeometry args={[0.07, 20, 20]} />
            <meshStandardMaterial
              color={GOLD}
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>
        </group>

        <PriceTag position={[0, 2.55, 0]} label={label} price={price} />
      </group>
    );
  },
);

/* ───────────────────────── SECTION 2: luxury shoe pedestal ───────────────────────── */

const LuxuryShoeDisplay = memo(
  ({
    position,
    label,
    price,
    spin,
    shoeColor = "#141018",
    soleColor = "#ffffff",
    accentColor = GOLD,
  }) => {
    const spinRef = useRef();

    useFrame((_, delta) => {
      if (spin && spinRef.current)
        spinRef.current.rotation.y += Math.min(delta, 0.05) * 0.35;
    });

    return (
      <group position={position}>
        <OverheadFixture color="#fff6e8" />

        <mesh position={[0, -0.7, 0]}>
          <cylinderGeometry args={[1.05, 1.1, 1.4, 8]} />
          <meshStandardMaterial
            color="#0f0c16"
            metalness={0.88}
            roughness={0.25}
          />
        </mesh>
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[1.06, 1.06, 0.04, 8]} />
          <meshStandardMaterial
            color={accentColor}
            metalness={0.95}
            roughness={0.18}
          />
        </mesh>

        {/* glass plinth — plain transparency instead of costly transmission */}
        <mesh position={[0, 0.16, 0]}>
          <boxGeometry args={[1.4, 0.22, 0.9]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.18}
            metalness={0.9}
            roughness={0.05}
            depthWrite={false}
          />
        </mesh>

        <group ref={spinRef} position={[0, 0.48, 0]}>
          <group rotation={[0.08, 0, 0.05]}>
            <RoundedBox args={[1.0, 0.16, 0.46]} radius={0.05} smoothness={3}>
              <meshStandardMaterial
                color={soleColor}
                roughness={0.3}
                metalness={0.1}
              />
            </RoundedBox>
            <RoundedBox
              args={[0.32, 0.18, 0.42]}
              radius={0.05}
              smoothness={3}
              position={[0.42, 0.04, 0]}
            >
              <meshStandardMaterial
                color={shoeColor}
                roughness={0.45}
                metalness={0.25}
              />
            </RoundedBox>
            <RoundedBox
              args={[0.65, 0.28, 0.44]}
              radius={0.06}
              smoothness={3}
              position={[-0.1, 0.2, 0]}
            >
              <meshStandardMaterial
                color={shoeColor}
                roughness={0.45}
                metalness={0.25}
              />
            </RoundedBox>
            <RoundedBox
              args={[0.22, 0.26, 0.42]}
              radius={0.05}
              smoothness={3}
              position={[-0.42, 0.14, 0]}
            >
              <meshStandardMaterial
                color={accentColor}
                metalness={0.9}
                roughness={0.2}
              />
            </RoundedBox>
            <RoundedBox
              args={[0.22, 0.06, 0.32]}
              radius={0.02}
              smoothness={3}
              position={[0.1, 0.32, 0]}
            >
              <meshStandardMaterial
                color={GOLD}
                metalness={0.95}
                roughness={0.12}
              />
            </RoundedBox>
          </group>
        </group>

        <PriceTag position={[0, 1.3, 0]} label={label} price={price} />
      </group>
    );
  },
);

/* ───────────────────────── backlit wall rack ───────────────────────── */

const SHELF_Y = [0.5, 1.6, 2.7];

const BoutiqueWallRack = memo(
  ({ position, rotation = [0, 0, 0], type = "bags" }) => (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 1.8, 0]}>
        <boxGeometry args={[4.2, 3.8, 0.15]} />
        <meshStandardMaterial
          color="#120c18"
          roughness={0.45}
          metalness={0.2}
        />
      </mesh>
      <mesh position={[0, 1.8, 0.09]}>
        <boxGeometry args={[4.25, 3.85, 0.02]} />
        <meshBasicMaterial color={GOLD} toneMapped={false} />
      </mesh>

      {SHELF_Y.map((y, idx) => (
        <group key={y} position={[0, y, 0.4]}>
          <mesh>
            <boxGeometry args={[3.8, 0.06, 0.7]} />
            <meshStandardMaterial
              color="#1f152a"
              metalness={0.7}
              roughness={0.25}
            />
          </mesh>
          <mesh position={[0, -0.04, 0]}>
            <boxGeometry args={[3.6, 0.02, 0.65]} />
            <meshBasicMaterial color="#fff3db" toneMapped={false} />
          </mesh>

          {type === "bags" ? (
            <>
              <mesh position={[-1.1, 0.12, 0]}>
                <boxGeometry args={[0.7, 0.18, 0.5]} />
                <meshStandardMaterial
                  color={idx % 2 ? LILAC : "#24192d"}
                  roughness={0.65}
                />
              </mesh>
              <mesh position={[-0.3, 0.12, 0]}>
                <boxGeometry args={[0.7, 0.18, 0.5]} />
                <meshStandardMaterial color="#15101a" roughness={0.65} />
              </mesh>
              <group position={[1.1, 0.22, 0]}>
                <mesh>
                  <boxGeometry args={[0.55, 0.4, 0.28]} />
                  <meshStandardMaterial
                    color="#2d1d14"
                    roughness={0.3}
                    metalness={0.2}
                  />
                </mesh>
                <mesh position={[0, 0.28, 0]}>
                  <torusGeometry args={[0.14, 0.02, 8, 24, Math.PI]} />
                  <meshStandardMaterial
                    color={GOLD}
                    metalness={0.9}
                    roughness={0.12}
                  />
                </mesh>
              </group>
            </>
          ) : (
            <>
              {[
                [-1.1, 0.25, "#ffffff", "#181320", 0.3, 0.1],
                [0.2, -0.2, GOLD, "#23172e", 0.2, 0.8],
                [1.2, 0.15, LILAC, "#110d16", 0.2, 0.7],
              ].map(([x, rot, sole, upper, rough, metal]) => (
                <group key={x} position={[x, 0.14, 0]} rotation={[0, rot, 0]}>
                  <mesh>
                    <boxGeometry args={[0.65, 0.12, 0.32]} />
                    <meshStandardMaterial
                      color={sole}
                      roughness={rough}
                      metalness={metal}
                    />
                  </mesh>
                  <mesh position={[0, 0.12, 0]}>
                    <boxGeometry args={[0.55, 0.18, 0.3]} />
                    <meshStandardMaterial color={upper} roughness={0.6} />
                  </mesh>
                </group>
              ))}
            </>
          )}
        </group>
      ))}
    </group>
  ),
);

/* ───────────────────────── architectural portals ───────────────────────── */

const PORTALS = [6, -2, -10, -18];

const Portal = memo(({ z, entrance }) => {
  const frame = entrance ? "#251a2e" : "#140f1a";
  const edge = entrance ? GOLD : LILAC;
  return (
    <group position={[0, 0, z]}>
      <mesh position={[-5.4, 1.6, 0]}>
        <boxGeometry args={[0.5, 7, 0.6]} />
        <meshStandardMaterial color={frame} metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[5.4, 1.6, 0]}>
        <boxGeometry args={[0.5, 7, 0.6]} />
        <meshStandardMaterial color={frame} metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 5.1, 0]}>
        <boxGeometry args={[11.3, 0.4, 0.6]} />
        <meshStandardMaterial color={frame} metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[-5.1, 1.6, 0.05]}>
        <boxGeometry args={[0.04, 6.8, 0.05]} />
        <meshBasicMaterial color={edge} toneMapped={false} />
      </mesh>
      <mesh position={[5.1, 1.6, 0.05]}>
        <boxGeometry args={[0.04, 6.8, 0.05]} />
        <meshBasicMaterial color={edge} toneMapped={false} />
      </mesh>
    </group>
  );
});

/* ───────────────────────── floating dust (single draw call) ───────────────────────── */

const Dust = memo(({ count }) => {
  const ref = useRef();
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      a[i * 3] = (Math.random() - 0.5) * 10;
      a[i * 3 + 1] = Math.random() * 6 - 1.4;
      a[i * 3 + 2] = -26 + Math.random() * 40;
    }
    return a;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = Math.sin(t * 0.18) * 0.14;
    ref.current.rotation.y = Math.sin(t * 0.07) * 0.03;
  });

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={getGlowTexture()}
        size={0.07}
        color="#fff1d6"
        transparent
        opacity={0.32}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
        toneMapped={false}
      />
    </points>
  );
});

/* ───────────────────────── 3D STORE SCENE ───────────────────────── */

const LuxuryStoreScene = ({ progress, pointerRef, spin, lowPower }) => {
  const size = useThree((s) => s.size);
  const aspect = size.width / Math.max(1, size.height);
  // 0 = wide desktop, 1 = narrow phone portrait
  const narrow = clamp((1.15 - aspect) / 0.65, 0, 1);
  const spread = lerp(1, 0.7, narrow);

  const ambientRef = useRef();
  const leftRef = useRef();
  const rightRef = useRef();
  const ceilingRef = useRef();
  const ptr = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05); // never let a long frame cause a camera jump
    const { camera, clock } = state;

    // Responsive field of view — keeps the whole aisle in frame on phones / tablets.
    const targetFov = lerp(45, 68, narrow);
    if (Math.abs(camera.fov - targetFov) > 0.01) {
      camera.fov = targetFov;
      camera.updateProjectionMatrix();
    }

    const p = clamp(progress.get(), 0, 1);
    const eased = p * 0.65 + p * p * (3 - 2 * p) * 0.35;

    ptr.current.x = damp(ptr.current.x, pointerRef.current.x, 3, dt);
    ptr.current.y = damp(ptr.current.y, pointerRef.current.y, 3, dt);

    camera.position.z = lerp(18, -17, eased);
    camera.position.y =
      lerp(lerp(1.5, 1.7, narrow), 0.88, eased) + ptr.current.y * -0.06;
    camera.position.x =
      Math.sin(clock.elapsedTime * 0.2) * 0.025 + ptr.current.x * 0.28;
    camera.lookAt(ptr.current.x * 0.5, 0.85 + ptr.current.y * -0.2, -28);

    const a = Math.min(1, p * 2.2);
    if (ambientRef.current) ambientRef.current.intensity = lerp(0.12, 0.85, a);
    const wall = lerp(4, 28, Math.min(1, p * 2));
    if (leftRef.current) leftRef.current.intensity = wall;
    if (rightRef.current) rightRef.current.intensity = wall;
    if (ceilingRef.current)
      ceilingRef.current.intensity = lerp(6, 38, Math.min(1, p * 1.8));
  });

  const x = 3.4 * spread;

  return (
    <>
      <color attach="background" args={[INK]} />
      <fog attach="fog" args={[INK, 9, 36]} />

      {/* Procedural studio reflections: no HDR download, rendered once. */}
      <Environment resolution={128} frames={1}>
        <Lightformer
          form="rect"
          intensity={1.6}
          color="#fff1d6"
          position={[0, 6, -4]}
          rotation-x={Math.PI / 2}
          scale={[3, 40, 1]}
        />
        <Lightformer
          form="rect"
          intensity={0.9}
          color={LILAC}
          position={[-8, 2, -6]}
          rotation-y={Math.PI / 2}
          scale={[30, 5, 1]}
        />
        <Lightformer
          form="rect"
          intensity={0.9}
          color={GOLD}
          position={[8, 2, -6]}
          rotation-y={-Math.PI / 2}
          scale={[30, 5, 1]}
        />
        <Lightformer
          form="ring"
          intensity={1.1}
          color="#ffffff"
          position={[0, 3, 10]}
          scale={6}
        />
      </Environment>

      {/* A small, fixed number of lights → no shader recompiles, cheap on phones. */}
      <ambientLight ref={ambientRef} intensity={0.15} color="#ebd9fc" />
      <hemisphereLight args={["#ebd9fc", "#120c18", 0.22]} />
      <pointLight
        ref={leftRef}
        position={[-5.8, 4.2, -5]}
        intensity={12}
        color="#fff1db"
        distance={26}
      />
      <pointLight
        ref={rightRef}
        position={[5.8, 4.2, -5]}
        intensity={12}
        color="#fff1db"
        distance={26}
      />
      <pointLight
        ref={ceilingRef}
        position={[0, 4.8, -8]}
        intensity={16}
        color={GOLD}
        distance={30}
      />
      <pointLight
        position={[0, 3.4, 4.6]}
        intensity={38}
        color="#fff3db"
        distance={11}
      />
      <pointLight
        position={[0, 3.4, -5.4]}
        intensity={34}
        color="#fff6e8"
        distance={11}
      />

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, -6]}>
        <planeGeometry args={[34, 64]} />
        <meshStandardMaterial
          color="#14101b"
          roughness={0.18}
          metalness={0.6}
        />
      </mesh>
      {[-2.4, 2.4].map((px) => (
        <mesh
          key={px}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[px, -1.79, -6]}
        >
          <planeGeometry args={[0.03, 64]} />
          <meshBasicMaterial color={GOLD} toneMapped={false} />
        </mesh>
      ))}

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 5.2, -6]}>
        <planeGeometry args={[34, 64]} />
        <meshStandardMaterial color="#0c0912" roughness={0.7} />
      </mesh>
      <mesh position={[0, 5.16, -6]}>
        <boxGeometry args={[0.3, 0.05, 54]} />
        <meshBasicMaterial color="#fff5e4" toneMapped={false} />
      </mesh>

      {PORTALS.map((z, i) => (
        <Portal key={z} z={z} entrance={i === 0} />
      ))}

      {/* Light pools on the floor under each display */}
      <FloorGlow position={[-x, -1.77, 4]} />
      <FloorGlow position={[x, -1.77, 4]} color="#f3e6ff" />
      <FloorGlow position={[-x, -1.77, -6]} color="#f0e4ff" />
      <FloorGlow position={[x, -1.77, -6]} />

      {/* Apparel */}
      <MannequinDressDisplay
        position={[-x, -0.6, 4]}
        label="Silk Blazer Gown"
        price="₹14,999"
        dressColor="#1a1224"
        accentColor={GOLD}
        lightColor="#fff4e0"
        spin={spin}
      />
      <MannequinDressDisplay
        position={[x, -0.6, 4]}
        label="Velvet Evening Robe"
        price="₹18,499"
        dressColor="#241730"
        accentColor={LILAC}
        lightColor="#f7ebff"
        spin={spin}
      />

      {/* Footwear */}
      <LuxuryShoeDisplay
        position={[-x, -0.6, -6]}
        label="Avi Shadow Runner"
        price="₹6,499"
        shoeColor="#14101a"
        soleColor="#e8e2ee"
        accentColor={LILAC}
        spin={spin}
      />
      <LuxuryShoeDisplay
        position={[x, -0.6, -6]}
        label="Apex Court Leather"
        price="₹7,999"
        shoeColor="#1f1814"
        soleColor="#faf6ef"
        accentColor={GOLD}
        spin={spin}
      />

      {/* Wall racks */}
      <BoutiqueWallRack
        position={[-5.1, -0.8, -1]}
        rotation={[0, Math.PI / 2, 0]}
        type="bags"
      />
      <BoutiqueWallRack
        position={[5.1, -0.8, -1]}
        rotation={[0, -Math.PI / 2, 0]}
        type="bags"
      />
      <BoutiqueWallRack
        position={[-5.1, -0.8, -9]}
        rotation={[0, Math.PI / 2, 0]}
        type="shoes"
      />
      <BoutiqueWallRack
        position={[5.1, -0.8, -9]}
        rotation={[0, -Math.PI / 2, 0]}
        type="shoes"
      />

      {/* Directional headers */}
      <SectionHeader
        position={[0, 5.0, 2]}
        text="COUTURE · DRESS ATELIER"
        color="rgba(217,181,95,0.92)"
      />
      <SectionHeader
        position={[0, 5.0, -8]}
        text="FOOTWEAR & SNEAKER SALON"
        color="rgba(196,161,245,0.92)"
      />

      <Dust count={lowPower ? 45 : 130} />
    </>
  );
};

/* Never let a WebGL failure take the whole landing page down. */
class CanvasBoundary extends React.Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {}
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/* ───────────────────────── BANNER ───────────────────────── */


const BannerScene = ({ ready, active, webgl, dpr, maxDpr, setDpr, onGlCreated, progress, pointerRef, reduced, lowPower }) => (
  <div className={`pointer-events-none absolute inset-0 z-0 transition-opacity duration-[1400ms] ease-out ${ready ? "opacity-100" : "opacity-0"}`} aria-hidden="true" style={{ touchAction: "pan-y" }}>
    {webgl && (
      <CanvasBoundary>
        <Canvas frameloop={active ? "always" : "never"} dpr={dpr} camera={{ position: [0, 1.5, 18], fov: 45, near: 0.1, far: 80 }} gl={{ antialias: true, alpha: false, stencil: false, depth: true, powerPreference: "high-performance" }} style={{ touchAction: "pan-y" }} onCreated={onGlCreated}>
          <PerformanceMonitor flipflops={3} onDecline={() => setDpr(1)} onIncline={() => setDpr(maxDpr)} onFallback={() => setDpr(1)} />
          <Suspense fallback={null}><LuxuryStoreScene progress={progress} pointerRef={pointerRef} spin={!reduced} lowPower={lowPower} /></Suspense>
        </Canvas>
      </CanvasBoundary>
    )}
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070509] via-transparent to-[#070509]/60" />
  </div>
);

export default memo(BannerScene);
