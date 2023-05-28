# Computação Visual 2023.1 Projeto - Parte 2
O projeto consiste em propor uma aplicação prática que utilize os tópicos aprendidos na disciplina. Eu escolhi a Opção 3, que requer a implementação de uma solução para um problema utilizando bibliotecas específicas.
Para o meu projeto, decidi criar um objeto 3D utilizando as bibliotecas PyOpenGL e Pygame. As bibliotecas necessárias para a implementação do meu projeto são PyOpenGL e Pygame. Além disso, o NumPy pode ser útil para cálculos numéricos em aplicações OpenGL.

** Como executar **
É necessário instalar a dependência do PyOpenGL entrando no diretório e usando o pip para instalar
```shell
pip install .\PyOpenGL-3.1.6-cp311-cp311-win_amd64.whl
```

## Integrantes: 
- Giovanni Vichiatti Mori - 32054033
- João Vitor Teles Centrone - 32033125
- Gustavo Coleto - 32076541

# Versão Web usando React + Three.JS
*Uma esfera com a textura do campus do Mackenzie + Blur + Reflexo do Ambiente*
Repositório no Github: https://github.com/GiovanniMori/kishimoto-project
Versão Online: https://kishimoto-project.vercel.app/

# Explicação do Código
```python
def main():
    glutInit(sys.argv)
    glutInitDisplayMode(GLUT_DOUBLE | GLUT_RGB | GLUT_DEPTH)
    glutInitWindowSize(400, 400)
    glutCreateWindow("Projeto Kishimoto: Esfera")
    glClearColor(0.0, 0.0, 0.0, 1.0)
    glShadeModel(GL_SMOOTH)
    glEnable(GL_CULL_FACE)
    glEnable(GL_DEPTH_TEST)
    glEnable(GL_LIGHTING)
    lightZeroPosition = [10.0, 4.0, 10.0, 1.0]
    lightZeroColor = [0.8, 1.0, 0.8, 1.0]  # green tinged
    glLightfv(GL_LIGHT0, GL_POSITION, lightZeroPosition)
    glLightfv(GL_LIGHT0, GL_DIFFUSE, lightZeroColor)
    glLightf(GL_LIGHT0, GL_CONSTANT_ATTENUATION, 0.1)
    glLightf(GL_LIGHT0, GL_LINEAR_ATTENUATION, 0.05)
    glEnable(GL_LIGHT0)
    glutDisplayFunc(display)
    glMatrixMode(GL_PROJECTION)
    gluPerspective(40.0, 1.0, 1.0, 40.0)
    glMatrixMode(GL_MODELVIEW)
    gluLookAt(0, 0, 10, 0, 0, 0, 0, 1, 0)
    glPushMatrix()
    glutMainLoop()
    return
```
Dentro da função `main()`:

-   `glutInit(sys.argv)` inicializa a biblioteca GLUT e passa os argumentos da linha de comando.
-   `glutInitDisplayMode(GLUT_DOUBLE | GLUT_RGB | GLUT_DEPTH)` define o modo de exibição do GLUT para usar buffers duplos, cor RGB e buffer de profundidade.
-   `glutInitWindowSize(400, 400)` define o tamanho da janela em pixels.
-   `glutCreateWindow("Projeto Kishimoto: Esfera")` cria uma janela com o título especificado.
-   `glClearColor(0.0, 0.0, 0.0, 1.0)` define a cor de fundo da janela como preto.
-   `glShadeModel(GL_SMOOTH)` configura o modelo de sombreamento para suavização.
-   `glEnable(GL_CULL_FACE)` ativa o culling de faces para não desenhar as faces voltadas para trás.
-   `glEnable(GL_DEPTH_TEST)` ativa o teste de profundidade para ocultar objetos ocultos.
-   `glEnable(GL_LIGHTING)` ativa a iluminação na cena.
-   `lightZeroPosition` e `lightZeroColor` são definidos para especificar a posição e a cor da luz zero.
-   `glLightfv(GL_LIGHT0, GL_POSITION, lightZeroPosition)` define a posição da luz zero.
-   `glLightfv(GL_LIGHT0, GL_DIFFUSE, lightZeroColor)` define a cor difusa da luz zero.
-   `glLightf(GL_LIGHT0, GL_CONSTANT_ATTENUATION, 0.1)` define o fator de atenuação constante da luz zero.
-   `glLightf(GL_LIGHT0, GL_LINEAR_ATTENUATION, 0.05)` define o fator de atenuação linear da luz zero.
-   `glEnable(GL_LIGHT0)` ativa a luz zero na cena.
-   `glutDisplayFunc(display)` define a função `display()` como a função de exibição.
-   `glMatrixMode(GL_PROJECTION)` define a matriz de projeção como a matriz de transformação atual.
-   `gluPerspective(40.0, 1.0, 1.0, 40.0)` define a perspectiva da câmera.
-   `glMatrixMode(GL_MODELVIEW)` define a matriz de visualização do modelo como a matriz de transformação atual.
-   `gluLookAt(0, 0, 10, 0, 0, 0, 0, 1, 0)` define a posição da câmera e o ponto para onde ela está olhando.
-   `glPushMatrix()` salva a matriz de transformação atual na pilha de matrizes.
-   `glutMainLoop()` inicia o loop principal do GLUT para tratar eventos de janela e renderização.

```python
def display():
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT)
    glPushMatrix()
    color = [1.0, 0.0, 0.0, 1.0]
    glMaterialfv(GL_FRONT, GL_DIFFUSE, color)
    glutSolidSphere(2, 20, 20)
    glPopMatrix()
    glutSwapBuffers()
    return
```
-   `glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT)` limpa o buffer de cor e o buffer de profundidade.
-   `glPushMatrix()` salva a matriz de transformação atual na pilha de matrizes.
-   `color = [1.0, 0.0, 0.0, 1.0]` define a cor do material como vermelho.
-   `glMaterialfv(GL_FRONT, GL_DIFFUSE, color)` define a cor difusa do material da esfera como a cor definida em `color`.
-   `glutSolidSphere(2, 20, 20)` renderiza uma esfera sólida com raio 2 e 20 divisões em latitude e longitude.
-   `glPopMatrix()` restaura a matriz de transformação anteriormente salva.
-   `glutSwapBuffers()` troca os buffers de exibição dupla.