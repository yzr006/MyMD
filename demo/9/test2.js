"use strict";
exports.__esModule = true;
var student = /** @class */ (function () {
    function student(name, gender) {
        this.name = name;
        this.gender = gender;
    }
    student.prototype.setAge = function (age) {
        this.age = age;
    };
    student.prototype.showInfo = function () {
        console.log(this.name, this.gender, this.age);
    };
    return student;
}());
var stu1 = new student('咯咯哒', 'female');
stu1.setAge(88);
stu1.showInfo();
exports["default"] = {};
