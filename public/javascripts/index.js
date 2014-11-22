$(function(){
	$('.del_file').off('click').on('click', function() {
		var dir = $(this).closest('li').attr('path');
		// alert(dir);
		$.post('/delete', {path: dir} ,function(res) {
			if(res.data){
				alert(res.data.msg);
			}else{
				window.location.href = '/'
			}
		});
	})
});