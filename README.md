# Aplicação com renderização 3D usando Three.js

Esta é uma aplicação que utiliza a biblioteca Three.js para criar uma cena de renderização em 3D. O trecho de código fornecido demonstra a configuração e os elementos principais da cena.

# Computação Visual 2023.1 Projeto - Parte 2

- Giovanni Vichiatti Mori - 32054033
- João Vitor Teles Centrone - 32033125
- Gustavo Coleto - 32076541

## Configuração da cena

```jsx
<Canvas shadows camera={{ position: [0, 0, 4.5], fov: 50 }}>
```

O componente `<Canvas>` é usado para criar o contexto WebGL e definir o ambiente de renderização em 3D. Neste caso, a câmera está posicionada em `[0, 0, 4.5]` no espaço 3D, e o campo de visão é de 50 graus.

## Grupo de objetos

```jsx
<group position={[0, -0.65, 0]}>
```

O componente `<group>` é usado para agrupar objetos em uma hierarquia. Neste caso, ele contém a esfera e as sombras acumulativas.

## Esfera

A função `Sphere()` é responsável por renderizar uma esfera na cena. Aqui está uma explicação do que acontece dentro dessa função:

```jsx
const texture = useTexture("./mack.jpg")
```

Nesta linha, a função `useTexture()` é chamada para carregar uma textura a partir do arquivo "./mack.jpg". A variável `texture` armazena essa textura para ser usada posteriormente na material da esfera.

```jsx
const { roughness } = useControls({ roughness: { value: 1, min: 0, max: 1 } })
```

Aqui, a função `useControls()` é utilizada para criar um controle interativo para ajustar a aspereza (roughness) da esfera. O valor inicial é 1, e o controle permite ajustar o valor mínimo para 0 e o valor máximo para 1. A variável `roughness` armazena o valor atual do controle.

```jsx
return (
  <Center top>
    <mesh castShadow>
      <sphereGeometry args={[0.75, 64, 64]} />
      <meshStandardMaterial metalness={1} roughness={roughness} map={texture} />
    </mesh>
  </Center>
)
```

Dentro do retorno da função, temos uma estrutura de componentes que representa a esfera. O componente `<Center>` é usado para centralizar verticalmente a esfera.

Dentro do componente `<mesh>`, temos a geometria da esfera representada pelo `<sphereGeometry>`. Os argumentos `[0.75, 64, 64]` definem o raio da esfera, o número de segmentos horizontais e o número de segmentos verticais.

O componente `<meshStandardMaterial>` define o material da esfera. Ele recebe propriedades como `metalness` (metalidade), `roughness` (aspereza) e `map` (textura). O valor da aspereza é controlado pela variável `roughness` que foi definida anteriormente, e a textura carregada é atribuída à propriedade `map`.

Esta função retorna a estrutura de componentes que representa a esfera renderizada na cena.

## Sombras acumulativas

```jsx
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
```

O componente `<AccumulativeShadows>` controla a geração de sombras acumulativas na cena. Ele recebe várias propriedades, como `temporal` (sombreamento temporal), `frames` (número de quadros para acumular sombras), `color` (cor das sombras), `colorBlend` (fusão de cor das sombras), `opacity` (opacidade das sombras), `scale` (escala das sombras) e `alphaTest` (valor de teste de transparência das sombras). Dentro deste componente, temos o componente `<RandomizedLight>`, que representa uma luz posicionada aleatoriamente na cena. Ele recebe propriedades como `amount` (quantidade de luzes), `radius` (raio de alcance das luzes), `ambient` (iluminação ambiente), `position` (posição da luz) e `bias` (ajuste de bias para as sombras).

## Ambiente

A função `Env()` é responsável por renderizar o ambiente na cena. Vamos analisar o que acontece dentro dessa função:

```jsx
const [preset, setPreset] = useState("sunset")
```

Nesta linha, a função `useState()` é utilizada para criar uma variável de estado chamada `preset`, que inicialmente é definida como "sunset". Essa variável será usada para controlar o preset do ambiente.

```jsx
const [inTransition, startTransition] = useTransition()
```

Aqui, a função `useTransition()` é chamada para criar duas variáveis: `inTransition` e `startTransition`. A variável `inTransition` é um booleano que indica se a transição está ocorrendo ou não, e a função `startTransition` é utilizada para iniciar a transição.

```jsx
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
```

Dentro do objeto passado para a função `useControls()`, temos duas propriedades: `blur` e `preset`. A propriedade `blur` define um controle deslizante que varia de 0 a 1, com um valor inicial de 0.1, para controlar o desfoque do ambiente. A propriedade `preset` define um seletor com várias opções de presets para o ambiente. O valor inicial é definido pela variável de estado `preset` que criamos anteriormente. Quando o valor do seletor é alterado, a função `onChange` é chamada, iniciando a transição para o novo preset.

```jsx
return <Environment preset={preset as any} background blur={blur} />
```

A função retorna o componente `<Environment>` que é responsável por renderizar o ambiente na cena. Ele recebe as propriedades `preset` (preset do ambiente), `background` (plano de fundo) e `blur` (valor do desfoque). O valor do preset é definido pela variável de estado `preset`, e o valor do desfoque é definido pelo controle deslizante `blur`.

Essa função retorna o componente `<Environment>` configurado com o preset, o plano de fundo e o desfoque definidos pelos controles e pela variável de estado.

## Controles de órbita

```jsx
<OrbitControls
  autoRotate
  autoRotateSpeed={4}
  enablePan={false}
  enableZoom={false}
  minPolarAngle={Math.PI / 2.1}
  maxPolarAngle={Math.PI / 2.1}
/>
```

O componente `<OrbitControls>` fornece controles de órbita para a câmera. Ele recebe propriedades como `autoRotate` (rotação automática da cena), `autoRotateSpeed` (velocidade da rotação automática), `enablePan` (habilitar ou desabilitar o pan), `enableZoom` (habilitar ou desabilitar o zoom), `minPolarAngle` (ângulo mínimo para rotação polar) e `maxPolarAngle` (ângulo máximo para rotação polar).
