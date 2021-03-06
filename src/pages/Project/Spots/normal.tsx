import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import GlRenderer from 'gl-renderer';
import styles from './index.less';

const Spots: React.FC<{}> = (props) => {
  useEffect(() => {
    showPic();
  }, []);

  const showPic = () => {
    const canvas = document.querySelector('canvas');
    const renderer = new GlRenderer(canvas);

    const vertex = `
      attribute vec2 a_vertexPosition;
      uniform vec2 xy;
      uniform float uTime;
      uniform float bias;

      void main(){
        vec3 pos = vec3(a_vertexPosition, 1);
        float scale = 0.7 + 0.3 * sin(6.28 * bias + 0.003 * uTime);
        mat3 m = mat3(
          scale, 0, 0,
          0, scale, 0,
          xy, 1
        );
      
        gl_Position = vec4(m * pos, 1);
      }
    `;

    const fragment = `
      #ifdef GL_ES
      precision highp float;
      #endif
      uniform vec4 u_color;
      
      void main() {
        gl_FragColor = u_color;
      }
    `;

    const program = renderer.compileSync(fragment, vertex);
    renderer.useProgram(program);
    
    function circle(radius = 0.05) {
      const delta = 2 * Math.PI / 32;
      const positions = [];
      const cells = [];
      for(let i = 0; i < 32; i++) {
        const angle = i * delta;
        positions.push([radius * Math.sin(angle), radius * Math.cos(angle)]);
        if(i > 0 && i < 31) {
          cells.push([0, i, i + 1]);
        }
      }
      return {positions, cells};
    }

    const COUNT = 500;
    function init() {
      const meshData = [];
      const {positions, cells} = circle();
      for(let i = 0; i < COUNT; i++) {
        const x = 2 * Math.random() - 1;
        const y = 2 * Math.random() - 1;
        const rotation = 2 * Math.PI * Math.random();
        const uniforms = {};

        uniforms.u_color = [
          Math.random(),
          Math.random(),
          Math.random(),
          1];

        uniforms.xy = [
          2 * Math.random() - 1,
          2 * Math.random() - 1,
        ];

        uniforms.bias = Math.random();

        meshData.push({
          positions,
          cells,
          uniforms,
        });
      }
      renderer.uniforms.uTime = 0;
      renderer.setMeshData(meshData);
    }
    init();

    function update(t) {
      renderer.uniforms.uTime = t;
      renderer.render();
      requestAnimationFrame(update);
    }

    update(0);
   
  };

  return (
    <div className={styles.main}>
      <canvas width="600" height="600"></canvas>
    </div>
  );
};

export default Spots;
