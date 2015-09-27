function student_sort(stu_arr){
    var sorted_arr;
    sorted_arr = stu_arr;
    sorted_arr.sort(function(a,b){
        if(a.age < b.age)
            return -1;
        else if(a.age > b.age)
            return 1;
        else{
            if(a.score > b.score)
                return -1;
            else if(a.score < b.score)
                return 1;
            else{
                var temp1 = a.name.substr(0, 1);
                var temp2 = a.name.substr(0, 1);
                if(temp1 < temp2)
                    return -1;
                else return 1;
            }
        }
    })
    return sorted_arr;
}
var stu_arr = [];
stu_arr.push({name:'Mary', age:20, score:80});
stu_arr.push({name:'Faker', age:20, score:90});
stu_arr.push({name:'Acorn', age:21, score:80});
stu_arr.push({name:'Godwei', age:21, score:90});
stu_arr.push({name:'Bamoue', age:20, score:90});
var arr = student_sort(stu_arr);
console.log(arr);