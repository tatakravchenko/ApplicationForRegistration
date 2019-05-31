       var st1, st2;
        function valid_fm() {
            obj_form=document.forms.fm;

            if (obj_form.login.value==''){
            alert("Укажите логин!");
              obj_form.login.focus();
              return;
            }
               if (obj_form.password.value=='' || obj_form.password1.value==''){
            alert("Укажите пароль!");
              obj_form.password.focus();
              return;
            }
            if (obj_form.mail.value==''){
            alert("Укажите e-mail!");
              obj_form.mail.focus();
              return;
            }
           
            if (obj_form.login.value.length<8 ) {
              alert('Придумайте логин, в котором не менее 8 символов!')
              obj_form.login.focus();
              return;
            }
            if (obj_form.login.value.length>20 ) {
              alert('Придумайте логин, в котором не более 20 символов!')
              obj_form.login.focus();
              return;
            }
            if (obj_form.password.value.length<8) {
              alert('Введите пароль, в котором не менее 8 символов! Ваш пароль слишком простой:)')
              obj_form.password.focus();
              return;
            }
            if (obj_form.password.value.length>25) {
              alert('Введите пароль, в котором не более 25 символов!')
              obj_form.password.focus();
              return;
            }
            if (obj_form.password.value!==obj_form.password1.value) {
              alert("Пароли не совпадают!");
              obj_form.password.focus();
              return;
            }
            
            obj_form.submit();
        }