import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators,ReactiveFormsModule} from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import {UserService} from './../../services/user/user.service';
import {AuthService} from './../../services/auth/auth.service';
import {Router} from "@angular/router";

//import { myFirstParticle } from '../../assets/particlesjs-config'
//import * as particlesJS from 'particles.js';
declare var particlesJS: any;
@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.scss']
})
export class LoginPanelComponent implements OnInit  {
  isLinear = false;
  registerForm: FormGroup;
  loginForm: FormGroup;
  isLoging: boolean;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ){
    this.isLoging=false;
  }

  submitRegisterForm(){
    this.userService.addNewUser(this.registerForm.value).subscribe();
  }
  submitLoginForm(){
    this.authService.login(this.loginForm.value);
    
  }

  loginFlagChange(){
    this.isLoging=true;
  }
  registerFlagChange(){
    this.isLoging=false;
  }

  ngOnInit() {
    this.registerForm = new FormGroup ({
      fName: new FormControl('', {
        validators: Validators.required,
        updateOn: 'blur'
      }),
      lName: new FormControl('', {
        validators: Validators.required,
        updateOn: 'blur'
      }),
      email: new FormControl('', {
        validators: Validators.required,
        updateOn: 'blur'
      }),
      password: new FormControl('', {
        validators: Validators.required,
        updateOn: 'blur'
      })
    });

    this.loginForm = new FormGroup ({
      email: new FormControl('', {
        validators: Validators.required,
        updateOn: 'blur'
      }),
      password: new FormControl('', {
        validators: Validators.required,
        updateOn: 'blur'
      })
    });


    particlesJS('particles-js',
  
  {
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
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 5,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 6,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
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
          "distance": 200
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true,
    "config_demo": {
      "hide_card": false,
      "background_color": "#b61924",
      "background_image": "",
      "background_position": "50% 50%",
      "background_repeat": "no-repeat",
      "background_size": "cover"
    }
  }

);
  }



}
