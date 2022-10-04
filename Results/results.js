 var app = angular.module('resultApp', [])
 app.controller('resultListController', function() {
  var resultList = this;
  resultList.subjects = [
    {
      name:"Science",
      marks: 100,
      done: false
    },
    {
      name:"Maths",
      marks: 100,
      done: false
    }
    ];

  resultList.addsubject = function() {
    resultList.subjects.push({name:resultList.subjectText, marks:resultList.subjectNumber, done:false, obtained:0});
    resultList.subjectText = '';
    angular.forEach(resultList.students, function(student){
      student.marks = [];
      student.marks = angular.copy(resultList.subjects)
    })
  };

  resultList.subdelete = function() {
    var oldsubjects = resultList.subjects;
    resultList.subjects = [];
    angular.forEach(oldsubjects, function(subject) {
      if (!subject.done) resultList.subjects.push(subject);
    });
    angular.forEach(resultList.students, function(student){
      student.marks = [];
      student.marks = angular.copy(resultList.subjects)
    })
  };
    resultList.students = [
      ];

    resultList.addstudent = function() {
      resultList.students.push({ number:resultList.studentNumber,name:resultList.studentText, done:false, marks: angular.copy(resultList.subjects), total: 0, percentage: 0, maxmark: 0, rank: 0});
      resultList.studentText = '';
      resultList.studentNumber ++ ; 
    };

    resultList.studelete = function() {
      var oldstudents = resultList.students;
      resultList.students = [];
      angular.forEach(oldstudents, function(student) {
        if (!student.done) resultList.students.push(student);
      });
    };

    resultList.makeresult = function() {

      var max=0;
      var ranks=1;
      var cnt=0;

      angular.forEach(resultList.students, function(student){
        student.total=0;
        student.maxmark=0;
        student.percentage=0;
      })

      angular.forEach(resultList.students, function(student){
        angular.forEach(student.marks, function(mark){
          student.total= student.total + mark.obtained;
        })
      });

      angular.forEach(resultList.students, function(student){
        angular.forEach(student.marks, function(mark){
          student.maxmark= student.maxmark + mark.marks;
        })
        max= student.maxmark;
      });

      angular.forEach(resultList.students, function(student){
        student.percentage= ( student.total / student.maxmark )*100;
      });

      for(var i=max; i>0; i--){
        angular.forEach(resultList.students, function(student){
          if(student.total==i){
            student.rank=ranks;
            cnt++;
          }
        });
        ranks=ranks+cnt;
        cnt=0;
      }

      angular.forEach(resultList.students, function(student){
        angular.forEach(student.marks, function(mark){
          mark.obtained=0;
        })
      })
    }
});
  

