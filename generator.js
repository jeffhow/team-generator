/* global $ */
$(document).ready(function(){
  $('#team-setup').fadeIn();
  
  // Reset app
  $('#reset').click(function(){
    $('#output').fadeOut(1000, function(){
      $('#output').find('ol').remove();
      $('#output').find('h2').remove();
      $('#team-setup').fadeIn(1000);
    });
  });
  
  // Make the teams
  $('#make-teams').click(function(){
    var names=[];
    var teams=[];
    
    // Place valid student names into names[]
    $('.stu-name').each(function(index){
      if($(this).val().length>0){
        names[index] = $(this).val();
      }
    });
    
    // Place valid team names into teams[]
    $('.team-name').each(function(index){
      if($(this).val().length>0){
        teams[index] = $(this).val();
      }
    });
    
    // No valid student names or team names
    if(names.length<1 || teams.length<1){
      return false; // empty arrays
    }
    
    // Not enough team members to make teams 
    var teammembers = names.length/teams.length;
    if(teammembers < 1){
      alert('Please add more team members');
      return false;
    }
      
    shuffle(names); // shuffle the names[]
    
    // UI transitions
    $('#team-setup').fadeOut(1000, function(){
      $('#loading').fadeIn(1000, function(){
        $('#loading').fadeOut(1000, function(){
          $('#output').fadeIn(1000);
        });
      });
    });
    
    // Setup output
    $('#output').prepend('<ol></ol>');
    $('#output').prepend('<h2>Your Teams:</h2>')
    // Loop through teams and add teams/teammates to output
    for(var i=0; i<teams.length; i++){
      // Append the current team to the ol
      $('#output').find('ol').append('<li>'+teams[i]+'</li>');
      
      // Setup the ul for teammembers
      $('#output>ol>li').last().append('<ul></ul>');
      
      // Loop through the names using the number of teammembers
      // and exit loop when we reach the number allowed
      // on each team
      for(var j=teammembers; j>0; j--){
        if(names.length<1){
          return false; // ran out of teammembers
        }
        $('#output>ol>li>ul').last().append('<li>'+names.pop()+'</li>');
      }
    }
      
    return false; //prevent form refresh
  });
  
  // Change the number of student fields 
  $('#no-of-students').change(function(){
    var n = this.value;
    var c = $('.stu-name').length
     if(n > c ){
       for(var i=0; i<(n - c); i++){
         var s = $('.stu-group').first().clone();
         s.children().last().val('');
         s.appendTo('#students');
       }
     }else if(n < c && n > 0){
       for(var i=c; i>n; i--){
         $('.stu-group').last().remove();
       }
     }
  });
  
  // Change the number of team fields  
  $('#no-of-teams').change(function(){
    var n = this.value;
    var c = $('.team-name').length
     if(n > c ){
       for(var i=0; i<(n - c); i++){
         var t = $('.team-group').first().clone();
         t.children().last().val('');
         t.appendTo('#teams');
       }
     }else if(n < c && n > 0){
       for(var i=c; i>n; i--){
         $('.team-group').last().remove();
       }
     }
  });
});

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
}