$(function() {
    $.ajax({
        url: '/api/list',
        dataType: 'json',
        success: function(res) {
            var str = '';
            res.data.list.forEach(function(item) {
                str += `<li>${item.title}</li>`;
            })
            console.log(str)
        },
        error: function(error) {
            console.warn(error)
        }
    })
})