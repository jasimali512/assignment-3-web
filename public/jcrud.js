$(function () {
  loaddata();
  $("#productdisp").on("click", ".btn-danger", handleDelete);
  $("#productdisp").on("click", ".btn-warning", handleupdate);
  $("#updatesave").click(function () {
    var id = $("#upid").val();
    var name = $("#upname").val();
    $.ajax({
      url: "https://assignment03web.herokuapp.com/api/faculty/" + id,
      data: { name },
      method: "PUT",
      success: function (response) {
        loaddata();
        $("#updatemodal").modal("hide");
      },
    });
  });
  $("#productdisp").on("click", ".btn-primary", function () {
    $("#addprobtn").modal("show");
  });
  $("#savenew").click(addnewproduct);
});
function handleupdate() {
  var btn = $(this);
  var parentID = btn.closest(".eproduct");
  let id = parentID.attr("data-id");
  console.log(id)
  $.get("https://assignment03web.herokuapp.com/api/faculty/" + id, function (response) {
    $(upid).val(id);
    $(upname).val(response.name);
    $("#updatemodal").modal("show");
  });
}
function addnewproduct() {
  var name = $("#name").val();
  console.log(name)
  $.ajax({
    url: "https://assignment03web.herokuapp.com/api/faculty/",
    method: "POST",
    data: {name:name},
    success: function (response) {
      console.log(response);
      loaddata();
      $("#addprobtn").modal("hide");
    },
  });
}
function handleDelete() {
  var btn = $(this);
  var parentID = btn.closest(".eproduct");
  let id = parentID.attr("data-id");
  $.ajax({
    url: "https://assignment03web.herokuapp.com/api/faculty/" + id,
    method: "DELETE",
    success: function () {
      loaddata();
    },
  });
}
function loaddata() {
  $.ajax({
    url: "https://assignment03web.herokuapp.com/api/faculty",
    method: "GET",
    error: function () {
      var product = $("#productdisp");
      product.html("An error occured!");
    },
    success: function (response) {
      console.log(response);
      var product = $("#productdisp");
      product.empty();
      for (var i = 0; i < response.length; i++) {
        var pro = response[i];
        // product.append(`<div class="eproduct"><p><strong>id: </strong> ${pro._id}</p><h3><strong>Name: </strong>${pro.name}</h3><p><strong>Color: </strong>${pro.color}</p><p><strong>Price: </strong>${pro.price}</p><p><strong>Department: </strong>${pro.department}</p><p><strong>Description: </strong>${pro.description}<button class="btn btn-danger float-right">Delete</ button></p></div> `);
        product.append(
          `<div class="eproduct" data-id=${i}  ><h3>${pro}</h3><p><button id="delbtn" class="btn btn-danger float-right">Delete</button><button id="editbtn" class="btn btn-warning float-right">Edit</button></p></div> `
        );
      }
    },
  });
}
