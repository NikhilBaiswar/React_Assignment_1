$(document).ready(function () {
  console.log("script loaded");
  function getData(data) {
    $("tbody").html("");
    for (let i = 0; i < data.length; i++) {
      const row = $("<tr>").addClass("data-row").attr("id", i);
      const column1 = $("<td>").addClass("column1").html(data[i].id);
      const column2 = $("<td>").addClass("column2").html(data[i].firstName);
      const column3 = $("<td>").addClass("column3").html(data[i].lastName);
      const column4 = $("<td>").addClass("column4").html(data[i].email);
      const column5 = $("<td>").addClass("column5").html(data[i].phone);
      row.append(column1, column2, column3, column4, column5);
      $("tbody").append(row);
      $("#table-data").on("click", ".data-row", function () {
        $(".data-row").removeClass("active");
        $(this).addClass("active");
        $("#info-content div #user-name").html(
          data[$(this).attr("id")].firstName + " " + data[$(this).attr("id")].lastName
        );
        $("#info-content div textarea").html(data[$(this).attr("id")].description);
        $("#info-content div #address").html(data[$(this).attr("id")].address.streetAddress);
        $("#info-content div #city").html(data[$(this).attr("id")].address.city);
        $("#info-content div #state").html(data[$(this).attr("id")].address.state);
        $("#info-content div #zip").html(data[$(this).attr("id")].address.zip);
      });
    }
  }
  $.get(
    "http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D",
    function (response) {
      getData(response);
      $("#search-box").on("keyup", function () {
        var value = $(this).val();
        var object = searchName(value, response);
        console.log(object);
        getData(object);
        console.log(getData(object));
      });
      function searchName(value, data) {
        var filterData = [];
        for (i = 0; i < data.length; i++) {
          value = value.toLowerCase();
          var userName = data[i].firstName.toLowerCase();
          if (userName.includes(value)) {
            filterData.push(data[i]);
          }
        }
        return filterData;
      }
    }
  );
});
