var month = 1;
var year = 0;
var month_name = ["NONE","JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"]
function isLeapYear(year){
	if(year % 4 == 0 && year % 100 != 0 || year % 400 == 0)
		return 1;
	return 0;
}

function firstDayOfYear(year){
	d1 = parseInt((year - 1) / 4)
	d2 = parseInt((year - 1) / 100)
	d3 = parseInt((year - 1) / 400)
	return (year + d1 - d2 + d3) % 7
}

function daysOfMonth(month){
	if(month == 2)
		return 28
	else if(month <= 7){
		if(month % 2 == 0)
			return 30
		else
			return 31
	}
	else{
		if(month % 2 == 0)
			return 31
		else
			return 30
	}
}

function getCalendar(month, year){
	let today = new Date();

	let day = ["SUN","MON","TUE","WED","THU","FRI","SAT"]
	let row_text_begin = "<div class='row'>"
	let head_text_begin = "<div class='card head'>"
	let grid_text_begin = "<div class='card'>"
	let non_grid_text_begin = "<div class='non'>"
	let grid_today_begin = "<div class='card today'>"
	end = "</div>"

	let calendar_grid = Array(7)
	calendar_grid.fill(row_text_begin)

	let first_day = firstDayOfYear(year)
	let leap_year = isLeapYear(year)
	let number_of_days = daysOfMonth(month)

	document.getElementById('months').options[month-1].selected = true;
	$('#year').val(year);

	//$('#mm-yy').text(month_name[month]+' '+year)
	for(let i = 0; i < 7; i++)
		calendar_grid[0] += head_text_begin+day[i]+end;
	
	for(let i=1; i < month; i++)
		first_day += daysOfMonth(i)
	if(month > 2)
		first_day += leap_year
	if(month == 2)
		number_of_days += leap_year 
	first_day %= 7
	
	j = 0
	next = 1
	for(let i = 0; i < first_day; i++){
		calendar_grid[next] += non_grid_text_begin+end;
		j += 1
	}
	
	for(let i = 0; i < number_of_days; i++){
		if(j % 7 == 0)
			next += 1
		if(year == today.getFullYear() && month == today.getMonth()+1 && (i+1) == today.getDate())
			calendar_grid[next] += grid_today_begin+(i+1)+end;
		else
			calendar_grid[next] += grid_text_begin+(i+1)+end;
		j += 1
	}
	
	while(j % 7 != 0){
		calendar_grid[next] += non_grid_text_begin+end;
		j += 1
	}
	
	$('#calendar').empty()
	for(let i = 0; i < 7; i++)
		$('#calendar').append(calendar_grid[i]+end);
}

function getNext(){
	month += 1
	if(month > 12){
		year += 1
		month = 1
	}
	getCalendar(month, year);
}

function getPrev(){
	if(year == 0 && month == 1)
		return;
	month -= 1;
	if(month < 0){
		if(year != 0){
			year -= 1;
			month = 12;
		}
	}
	getCalendar(month, year);
}

function Go(){
	month = document.getElementById('months').selectedIndex + 1;
	year = parseInt($('#year').val());
	getCalendar(month, year);
}

function main(){
	for(let i = 1; i < 13; i++)
		$('#months').append("<option>"+month_name[i]+"</option>");
	date = new Date()
	year = date.getFullYear();
	month = date.getMonth() + 1;
	getCalendar(month, year);
}

main()
