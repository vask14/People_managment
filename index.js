var users = [];

function SuperUser() {
    this.isDataVisible = true;
}

SuperUser.prototype.changeDataVisibility = function() {
    this.isDataVisible = !this.isDataVisible;
    return this.isDataVisible;
}


function User() {
    SuperUser.call(this);
    var that = this;
    this.name = '';
    this.sex = '';
    this.birth = '';
    this.address = '';
    this.phone = '';
    this.email = '';
    this.isValid = function () {
        var UserData = {
            name: that.name,
            sex: that.sex,
            birth: that.birth,
            address: that.address,
            phone: that.phone,
            email: that.email
        };
        var RegEx = {
            name: /^[A-zА-я][^;:#*%S]/,
            sex: /Male|Female|Other/,
            birth: /(\d+)(-|\/)(\d+)(?:-|\/)(?:(\d+)\s+(\d+):(\d+)(?::(\d+))?(?:\.(\d+))?)?/,
            address: /^[A-zА-я\d][^;:#*%S]/,
            phone: /^\(?([0-9]{3})\)?[-]?([0-9]{2})[-]?([0-9]{2})$/,
            email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        }
     //   var valid = false;
        var List = [
            RegEx.name.test(UserData.name),
            RegEx.sex.test(UserData.sex),
            RegEx.birth.test(UserData.birth),
            RegEx.address.test(UserData.address),
            RegEx.phone.test(UserData.phone),
            RegEx.email.test(UserData.email)
        ];
        if(!List[0] || !UserData.name) {
            alert('Please enter your name');
        }
        else if(!List[1] || !UserData.sex) {
            alert("Please enter your sex");
        }
        else if(!List[2] || !UserData.birth) {
            alert("Please enter your birth date");
        }
        else if(!List[3] || !UserData.address) {
            alert("Please enter your address");
        }
        else if(!List[4] || !UserData.phone) {
            alert("Please enter your phone");
        }
        else if(!List[5] || !UserData.email) {
            alert("Please enter your email");
        }
        else {
            return true;
        }
        return false;
    }
    this.save = function() {
        that.generateUniqueId();
    }
    this.generateUniqueId = function() {
        that.id = Math.random();
    }
}
User.prototype = new SuperUser();
function View() {
    var that = this;
    var $table = document.querySelector('table tbody');


    var $fields = {
        name: document.querySelector('input[name="name"'),
        sex: document.querySelector('input[name="Sex"'),
        birth: document.querySelector('input[name="birth"'),
        address: document.querySelector('input[name="address"'),
        phone: document.querySelector('input[name="phone"'),
        email: document.querySelector('input[name="email"')
    }


   this.bindEvents = function() {
       var $saveButton = document.getElementById('save');
       $saveButton.addEventListener('click',this.onSaveButtonClick);
     };

   
   this.onSaveButtonClick = function(event) {
       event.preventDefault();
       var user = new User();
       user.name = $fields.name.value;
       user.sex = $fields.sex.value;
       user.birth = $fields.birth.value;
       user.address = $fields.address.value;
       user.phone = $fields.phone.value;
       user.email = $fields.email.value;
       if(!user.isValid()) {
           return false;
       }
       user.save();
       users.push(user);
       that.cleanForm();
       that.render();
   }
   
   this.cleanForm = function () {
       $fields.name.value = '';
       $fields.sex.value = '';
       $fields.birth.value = '';
       $fields.address.value = '';
       $fields.phone.value = '';
       $fields.email.value = '';
   }

   this.render = function() {
       that.clearTable();
       users.forEach(function (user){
           that.addRow(user);
       })
   }
   this.clearTable = function () {
       $table.innerHTML = '';
   }
   this.addRow = function(user) {
       var $tr = document.createElement('tr');
       $tr.addEventListener('click',that.onRowClick);
       $tr.setAttribute('data-id',user.id);
       var $tdName = document.createElement('td');
       var $tdSex = document.createElement('td');
       $tdSex.setAttribute('data-visible','data-visible');
       var $tdBirth = document.createElement('td');
       $tdBirth.setAttribute('data-visible','data-visible');
       var $tdAddress = document.createElement('td');
       $tdAddress.setAttribute('data-visible','data-visible');
       var $tdPhone = document.createElement('td');
       $tdPhone.setAttribute('data-visible','data-visible');
       var $tdEmail = document.createElement('td');
       $tdEmail.setAttribute('data-visible','data-visible');
       $tdName.innerHTML = user.name;
       $tdSex.innerHTML = user.sex;
       $tdBirth.innerHTML = user.birth;
       $tdAddress.innerHTML = user.address;
       $tdPhone.innerHTML = user.phone;
       $tdEmail.innerHTML = user.email;
       $tr.appendChild($tdName);
       $tr.appendChild($tdSex);
       $tr.appendChild($tdBirth);
       $tr.appendChild($tdAddress);
       $tr.appendChild($tdPhone);
       $tr.appendChild($tdEmail);
       $table.appendChild($tr);
   }
    this.onRowClick = function(e) {
    	if(e.target.parentNode.classList.contains("vish")){
           e.target.parentNode.classList.remove("vish");
           e.target.parentNode.firstChild.classList.remove("visv");
         }
         else{
         var $currentRow = e.target.parentNode;
         $currentRow.classList.add("vish");
         $currentRow.firstChild.classList.add("visv");
         var $currentData = e.target;
       //  console.log($currentData);
         var UserId = $currentRow.getAttribute('data-id');
         var UserData = $currentData.getAttribute('data-visible');
         console.log(UserId);
         }
         //console.log(UserData);
      }
}
var table = new View();
table.bindEvents();