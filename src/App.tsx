import { useState, useTransition } from "react"
import { useControls } from "leva"
import { Canvas } from "@react-three/fiber"
import {
  AccumulativeShadows,
  RandomizedLight,
  Center,
  Environment,
  OrbitControls,
  useTexture,
} from "@react-three/drei"
import { motion } from "framer-motion"

export default function App() {
  return (
    <motion.main className="bg-black h-screen w-screen flex flex-col items-center overflow-y-hidden">
      <motion.div className="flex gap-4 items-center absolute z-10 top-10">
        <motion.img src="./Mackenzie_M.svg" height={40} width={40} />
        <h1 className="text-3xl font-bold text-red-500">Kishimoto</h1>
      </motion.div>
      <Canvas shadows camera={{ position: [0, 0, 4.5], fov: 50 }}>
        <group position={[0, -0.65, 0]}>
          <Sphere />
          <AccumulativeShadows
            temporal
            frames={200}
            color="purple"
            colorBlend={0.5}
            opacity={1}
            scale={10}
            alphaTest={0.85}
          >
            <RandomizedLight
              amount={8}
              radius={5}
              ambient={0.5}
              position={[5, 3, 2]}
              bias={0.001}
            />
          </AccumulativeShadows>
        </group>
        <Env />
        <OrbitControls
          autoRotate
          autoRotateSpeed={4}
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 2.1}
          maxPolarAngle={Math.PI / 2.1}
        />
      </Canvas>
    </motion.main>
  )
}

function Sphere() {
  const texture = useTexture("./mack.jpg")
  const { roughness } = useControls({ roughness: { value: 1, min: 0, max: 1 } })
  return (
    <Center top>
      <mesh castShadow>
        <sphereGeometry args={[0.75, 64, 64]} />
        <meshStandardMaterial
          metalness={1}
          roughness={roughness}
          map={texture}
        />
      </mesh>
    </Center>
  )
}
function Env() {
  const [preset, setPreset] = useState("sunset")
  const [inTransition, startTransition] = useTransition()
  const { blur } = useControls({
    blur: { value: 0.1, min: 0, max: 1 },
    preset: {
      value: preset,
      options: [
        "sunset",
        "dawn",
        "night",
        "warehouse",
        "forest",
        "apartment",
        "studio",
        "city",
        "park",
        "lobby",
      ],
      onChange: (value) => startTransition(() => setPreset(value)),
    },
  })
  return <Environment preset={preset as any} background blur={blur} />
}
