from math import *

try:
    from OpenGL.GL import *
    from OpenGL.GLU import *
    from OpenGL.GLUT import *
except:
    print("Error: OpenGL wrapper for python not found")
import sys


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


def display():
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT)
    glPushMatrix()
    color = [0.0, 1.0, 0.0, 1.0]
    glMaterialfv(GL_FRONT, GL_DIFFUSE, color)
    glutSolidSphere(2, 20, 20)
    glPopMatrix()
    glutSwapBuffers()
    return


if __name__ == "__main__":
    main()
