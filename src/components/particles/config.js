// export default {
//     "particles": {
//       "number": {
//         "value": 80,//数量
//         "density": {
//           "enable": true, //启用粒子的稀密程度
//           "value_area": 800 //区域散布密度大小
//         }
//       },
//       "color": {
//         "value": "#ffffff" //原子的颜色
//       },
//       "shape": {
//         "type":"star" , //原子的形状 "circle" ,"edge" ,"triangle" ,"polygon" ,"star" ,"image" ,["circle", "triangle", "image"]
//         "stroke": {
//           "width": 2, //原子的宽度
//           "color": "#362cff" //原子颜色
//         },
//         "polygon": {
//           "nb_sides": 5 // 原子的多边形边数
//         },
//         "image": {
//           "src": "img/github.svg", // 原子的图片可以使用自定义图片 "assets/img/yop.svg" , "http://mywebsite.com/assets/img/yop.png"
//           "width": 100, //图片宽度
//           "height": 100 //图片高度
//         }
//       },
//       "opacity": {
//         "value": 0.8, //不透明度
//         "random": true, //随机不透明度
//         "anim": {
//           "enable": true, //渐变动画
//           "speed": 3, // 渐变动画速度
//           "opacity_min": 0.2, //渐变动画不透明度
//           "sync": false 
//         }
//       },
//       "size": {
//         "value": 4, //原子大小
//         "random": true, // 原子大小随机
//         "anim": {
//           "enable": false, // 原子渐变
//           "speed": 30, //原子渐变速度
//           "size_min": 0.1, 
//           "sync": false
//         }
//       },
//       "line_linked": {
//         "enable": true, //连接线
//         "distance": 200, //连接线距离
//         "color": "#edd1d8", //连接线颜色
//         "opacity": 0.9, //连接线不透明度
//         "width": 2 //连接线的宽度
//       },
//       "move": {
//         "enable": true, //原子移动
//         "speed": 8, //原子移动速度
//         "direction": "none", //原子移动方向   "none" ,"top" ,"top-right" ,"right" ,"bottom-right" ,"bottom" ,"bottom-left" ,"left" ,"top-left"
//         "random": true, //移动随机方向
//         "straight": false, //直接移动
//         "out_mode": "out", //是否移动出画布
//         "bounce": false, //是否跳动移动
//         "attract": { 
//           "enable": false, // 原子之间吸引
//           "rotateX": 100, //原子之间吸引X水平距离
//           "rotateY": 1200  //原子之间吸引Y水平距离
//         }
//       }
//     },
//     "interactivity": {
//       "detect_on": "Window", //原子之间互动检测 "canvas", "window"
//       "events": {
//         "onhover": {
//           "enable": true, //悬停
//           "mode": "grab" //悬停模式      "grab"抓取临近的,"bubble"泡沫球效果,"repulse"击退效果,["grab", "bubble"]
//         },
//         "onclick": {
//           "enable": true,  //点击效果
//           "mode": ["push", "repulse"]  //点击效果模式   "push" ,"remove" ,"bubble" ,"repulse" ,["push", "repulse"]
//         },
//         "resize": true // 互动事件调整
//       },
//       "modes": {
//         "grab": {
//           "distance": 140, //原子互动抓取距离
//           "line_linked": { 
//             "opacity": 1  //原子互动抓取距离连线不透明度
//           }
//         },
//         "bubble": {
//           "distance": 400, //原子抓取泡沫效果之间的距离
//           "size": 40, // 原子抓取泡沫效果之间的大小
//           "duration": 2, //原子抓取泡沫效果之间的持续事件
//           "opacity": 8, //原子抓取泡沫效果透明度
//           "speed": 3 
//         },
//         "repulse": {
//           "distance": 400, //击退效果距离
//           "duration": 0.4 //击退效果持续事件
//         },
//         "push": {
//           "particles_nb": 4 //粒子推出的数量
//         },
//         "remove": {
//           "particles_nb": 2
//         }
//       }
//     },
//     "retina_detect": true
//   }



let a = {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "star",
        "stroke": {
          "width": 2,
          "color": "#ffb61e"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/5.png",
          "width": 1000,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.8,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 2,
          "opacity_min": 0.2,
          "sync": false
        }
      },
      "size": {
        "value": 4,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 30,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": false,
        "distance": 150,
        "color": "#edd1d8",
        "opacity": 1,
        "width": 2
      },
      "move": {
        "enable": true,
        "speed": 8,
        "direction": "bottom-right",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": true,
          "rotateX": 100,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "Window",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 140,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  };
module.exports.particlesConfig = a;