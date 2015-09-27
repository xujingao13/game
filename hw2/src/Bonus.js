function Student(initname, initage, inithometown){
    var student = new Object();
    student.name = initname;
    student.age = initage;
    student.hometown = inithometown;
    return student;
}
function TeacherAssistant(initstudents){
    var teacher_assistant = new Object();
    
    teacher_assistant.students = initstudents;

    teacher_assistant.search = function(){
        var result_students = [];
        var student_num = this.students.length;

        if(typeof arguments[0] === "number"){
            for(var i = 0; i < student_num; i++){
                if(this.students[i].age === arguments[0])
                    result_students.push(this.students[i]);
            }
            return result_students;
        }
        else if(typeof arguments[0] === "string"){
            for(var j = 0; j < student_num; j++)
                if(this.students[j].name === arguments[0])
                    return this.students[j];
        }
        else{
            for(var k = 0; k < student_num; k++){
                if(!("age" in arguments[0]) || this.students[k].age === arguments[0].age){
                    if(!("name" in arguments[0]) || this.students[k].name === arguments[0].name){
                        if(!("hometown" in arguments[0]) || this.students[k].hometown === arguments[0].hometown){
                                result_students.push(this.students[k]);
                        }
                    }
                }
            }

            return result_students;
        }
    }

    teacher_assistant.first = function(){
        var result_students = [];
        var student_num = this.students.length;

        if(typeof arguments[0] === "number"){
            for(var i = 0; i < student_num; i++){
                if(this.students[i].age === arguments[0])
                    return this.students[i];
            }
        }
        else if(typeof arguments[0] === "string"){
            for(var j = 0; j < student_num; j++)
                if(this.students[j].name === arguments[0])
                    return this.students[j];
        }
        else{
            for(var k = 0; k < student_num; k++){
                if(!("age" in arguments[0]) || this.students[k].age === arguments[0].age)
                    if(!("name" in arguments[0]) || this.students[k].name === arguments[0].name)
                        if(!("hometown" in arguments[0]) || this.students[k].hometown === arguments[0].hometown)
                                return this.students[k];
            }
        }
    }

    teacher_assistant.diff = function(another){
    	var another_students = [];
    	var another_num = another.students.length;
    	for(var m = 0; m < another_num; m++){
    		if(!contains(this.students, another.students[m]))
    			another_students.push(another.students[m])
    	}
    	return another_students;
    }

    teacher_assistant.merge = function(another){
    	var another_students = [];
    	var another_num = another.students.length;
    	for(var m = 0; m < another_num; m++){
    		if(!contains(this.students, another.students[m]))
    			another_students.push(another.students[m])
    	}
    	for(var i = 0; i < another_students.length; i++)
    		this.students.push(another_students[i]);

    	return another_students.length;
    }

    return teacher_assistant;
}
function contains(a, obj){
	var l = a.length;

	for(var i = 0; i < l; i++){
		if(a[i] === obj)
			return true;
	}

	return false;
}
var student_1 = Student("Amy", 21, "Beijing");
var student_2 = Student("Alice", 21, "Tianjing");
var student_3 = Student("Black", 20, "Liaoning");
var student_4 = Student("Francy", 22, "Zhejing");
var student_5 = Student("Frank", 23, "Shandong");

var students_1 = [];
students_1.push(student_1);
students_1.push(student_2);
students_1.push(student_5);
var students_2 = [];
students_2.push(student_3);
students_2.push(student_4);

teacher_assistant_1 = TeacherAssistant(students_1);
teacher_assistant_2 = TeacherAssistant(students_2);
teacher_assistant_1.merge(teacher_assistant_2);