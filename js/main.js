
$(document).ready(function(){
    //getTasks();
    //getCategories();
    //getCategoryOptions();

    $('#add_wine').on('submit', wineAdd);
    // $('#edit_task').on('submit', editTask);
    // $('#add_category').on('submit', addCategory);
    // $('#edit_category').on('submit', editCategory);

    // $('body').on('click', '.btn-edit-task', setTask);
    // $('body').on('click', '.btn-delete-task', deleteTask);

    // $('body').on('click', '.btn-edit-category', setCategory);
    // $('body').on('click', '.btn-delete-category', deleteCategory);

});

const apiKey = 'HieyE-I0eT96gbsQioP5fOMTb5zvrMIc';
const dbName = 'winedb';
const C_wineBottles = 'wine_bottles'; // Wine bottles collection name
// const C_categoryName = 'categories'; // Category collection name

/**
 * 
 * 
 */
// function getTasks() {
//     $.get('https://api.mlab.com/api/1/databases/'+dbName+'/collections/'+C_tasksName+'?apiKey='+apiKey, function(data){
//         var output = '<ul class="list-group">';
//         $.each(data, function(key, task){
//             output += '<li class="list-group-item">';
//             // Is task in a past due date ?
//             d_task = new Date(task.due_date);
//             d_now = new Date();
//             d_class = 'label-warning';
//             if(d_task < d_now) {
//                 d_class = 'label-danger';
//             } else if(d_task > d_now) {
//                 d_class = 'label-success';
//             }
//             output += task.task_name+'&nbsp;<span class="due_on label '+d_class+'">'+task.due_date+'</span>&nbsp;';
//             if(task.is_urgent == "true") {
//                 output += '<span class="label label-danger">Urgent</span>&nbsp;';
//             }
//             output += '<div class="pull-right"><a class="btn btn-primary btn-edit-task" data-task-name="'+task.task_name+'" data-task-id="'+task._id.$oid+'" href="#">Edit</a>&nbsp;';
//             output += '<a class="btn btn-danger btn-delete-task" data-task-id="'+task._id.$oid+'" href="#">Delete</a></div>';
//         });
//         output += '</ul>';
//         $('#tasks').html(output);
//     });
// }

function wineAdd(e) {
    var wName           = $('#wine-name').val();
    var wAppellation    = $('#wine-appellation').val();
    var wRegion         = $('#wine-region').val();
    var wColor          = $('#wine-color').val();
    var wGraps          = $('#wine-graps').val();
    var wYear           = $('#wine-millesime').val();
    var wVendanges      = $('#wine-vendanges').val();    
    var wBioLabel       = $('#wine-biolabel').val();
    var wNAS            = $('#wine-nosulphite').val(); // No Added Sulphite
    var wSparklingness  = $('#wine-sparklingness').val();
    var bQty            = $('#bottle-qty').val();
    var bPrice          = $('#bottle-price').val();

    $.ajax({
        url: 'https://api.mlab.com/api/1/databases/'+dbName+'/collections/'+C_wineBottles+'?apiKey='+apiKey,
        data: JSON.stringify({
            "wineName": wName,
            "wineAppellation": wAppellation,
            "wineRegion": wRegion,
            "wineColor": wColor,
            "wineGraps": wGraps,
            "wineYear": wYear,
            "wineBioLabel": wBioLabel,
            "wineVendanges": wVendanges,
            "wineNoAddedSulphite": wNAS,
            "wineSparklingness": wSparklingness,
            "bottle": {"quantity": bQty, "price": bPrice}
        }),
        type: 'POST',
        contentType: 'application/json',
        success: function(data){
            window.location.href='wine-bottle-add.html';
        },
        error: function(xhr, status, err) {
            console.log(err);
        }
    });
    e.preventDefault();
}



// /**
//  * 
//  * 
//  * @param {any} e 
//  */
// function editTask(e) {
//     var task_id = sessionStorage.getItem('current_id');
//     var task_name = $('#task_name').val();
//     var category = $('#category').val();
//     var due_date = $('#due_date').val();
//     var is_urgent = $('#is_urgent').val();
//     var is_done = $('#is_done').is(':checked');
    
//     $.ajax({
//         url: 'https://api.mlab.com/api/1/databases/'+dbName+'/collections/'+C_tasksName+'/'+task_id+'?apiKey='+apiKey,
//         data: JSON.stringify({
//             "task_name": task_name,
//             "category": category,
//             "due_date": due_date,
//             "is_urgent": is_urgent,
//             "is_done": is_done
//         }),
//         type: 'PUT',
//         contentType: 'application/json',
//         success: function(data){
//             window.location.href='index.html';
//         },
//         error: function(xhr, status, err) {
//             console.log(err);
//         }
//     });
//     e.preventDefault();
// }

// function deleteTask(e) {
//     var task_id = $(this).data('task-id');
//     $.ajax({
//         url: 'https://api.mlab.com/api/1/databases/'+dbName+'/collections/'+C_tasksName+'/'+task_id+'?apiKey='+apiKey,
//         type: 'DELETE',
//         async: true,
//         contentType: 'application/json',
//         success: function(data){
//             window.location.href='index.html';
//         },
//         error: function(xhr, status, err) {
//             console.log(err);
//         }
//     });
//     e.preventDefault();
// }

// function setTask() {
//     var task_id = $(this).data('task-id');
//     sessionStorage.setItem('current_id', task_id);
//     window.location.href='edittask.html';
//     return false;
// }

// function getTask(task_id){
//     $.get('https://api.mlab.com/api/1/databases/'+dbName+'/collections/'+C_tasksName+'/'+task_id+'?apiKey='+apiKey, function(task){
//         $('#task_name').val(task.task_name);
//         $('#category').val(task.category);
//         $('#due_date').val(task.due_date);
//         $('#is_urgent').val(task.is_urgent);
//         $('#is_done').attr("checked",task.is_done);
//     });
    
// }

// function getCategoryOptions() {
//     $.get('https://api.mlab.com/api/1/databases/'+dbName+'/collections/'+C_categoryName+'?apiKey='+apiKey, function(data){
//         var output;
//         $.each(data, function(key, category){
//             output += '<option value="'+category.category_name+'">'+category.category_name+'</option>';
//         });
//         $('#category').append(output);
//     });
// }

// function getCategories() {
//     $.get('https://api.mlab.com/api/1/databases/'+dbName+'/collections/'+C_categoryName+'?apiKey='+apiKey, function(data){
//         var output = '<ul class="list-group">';
//         $.each(data, function(key, category){
//             output += '<li class="list-group-item">';
//             output += category.category_name;
//             output += '<div class="pull-right"><a class="btn btn-primary btn-edit-category" data-category-name="'+category.category_name+'" data-category-id="'+category._id.$oid+'" href="#">Edit</a>&nbsp;';
//             output += '<a class="btn btn-danger btn-delete-category" data-category-id="'+category._id.$oid+'" href="#">Delete</a></div>';
//         });
//         output += '</ul>';
//         $('#categories').html(output);
//     });
// }

// function addCategory(e) {

//     var category_name = $('#category_name').val();

//     $.ajax({
//         url: 'https://api.mlab.com/api/1/databases/'+dbName+'/collections/'+C_categoryName+'?apiKey='+apiKey,
//         data: JSON.stringify({
//             "category_name": category_name
//         }),
//         type: 'POST',
//         contentType: 'application/json',
//         success: function(data){
//            window.location.href='categories.html';
//         },
//         error: function(xhr, status, err) {
//             console.log(err);
//         }
//     });
//     e.preventDefault();
// }

// function setCategory() {
//     var category_id = $(this).data('category-id');
//     sessionStorage.setItem('current_id', category_id);
//     window.location.href='editcategory.html';
//     return false;
// }
// function getCategory(category_id){
//     $.get('https://api.mlab.com/api/1/databases/'+dbName+'/collections/'+C_categoryName+'/'+category_id+'?apiKey='+apiKey, function(category){
//         $('#category_name').val(category.category_name);
//         $('#category_name').focus();
//         $('#category_name').select();
//     });
    
// }

// function editCategory(e) {
//     var category_id = sessionStorage.getItem('current_id');
//     var category_name = $('#category_name').val();

//     $.ajax({
//         url: 'https://api.mlab.com/api/1/databases/'+dbName+'/collections/'+C_categoryName+'/'+category_id+'?apiKey='+apiKey,
//         data: JSON.stringify({
//             "category_name": category_name,
//         }),
//         type: 'PUT',
//         contentType: 'application/json',
//         success: function(data){
//             window.location.href='categories.html';
//         },
//         error: function(xhr, status, err) {
//             console.log(err);
//         }
//     });
//     e.preventDefault();
// }

// function deleteCategory(e) {
//     var category_id = $(this).data('category-id');
//     $.ajax({
//         url: 'https://api.mlab.com/api/1/databases/'+dbName+'/collections/'+C_categoryName+'/'+category_id+'?apiKey='+apiKey,
//         type: 'DELETE',
//         async: true,
//         contentType: 'application/json',
//         success: function(data){
//             window.location.href='categories.html';
//         },
//         error: function(xhr, status, err) {
//             console.log(err);
//         }
//     });
//     e.preventDefault();
// }