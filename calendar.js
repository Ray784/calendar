var month = 1;
var year = 0;
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
	let day = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
	let month_name = ["NONE","JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
	let head = `<div class = "none"></div>
                <button class = "card btn pn" onclick="getPrev()">❮ Prev</button>
                <select class = "card slt" id = "months"></select>
                <input type="number" class = "card ipt" id = "year">
                <button class = "card btn" id="go" onclick="Go()">Go</button>
                <button class = "card btn pn" onclick="getNext()">Next ❯</button>
                <div class="none"></div>`;
	let grid = "<div class='card'>";
	let day_grid = "<div class='card head'>"
	let empty_grid = "<div class='none'></div>";
	let grid_today = "<div class='card today'>";
	let grid_sun = "<div class = 'card sun'>";
	let end = "</div>";
	let main = $('#main');
	let first_day = firstDayOfYear(year);
	let leap_year = isLeapYear(year);
	let number_of_days = daysOfMonth(month);

	console.log(month);

	main.empty();
	main.append(head);
	for(let i = 1; i < 13; i++)
		$('#months').append("<option>"+month_name[i]+"</option>");
	for(let i = 0; i < 7; i++)
		main.append(day_grid+day[i]+end);
	document.getElementById('months').options[month-1].selected = true;
	$('#year').val(year);

	for(let i = 1; i < month; i++)
		first_day += daysOfMonth(i);
	if(month > 2)
		first_day += leap_year;
	if(month == 2)
		number_of_days += leap_year;
	first_day %= 7;

	for(let i = 0; i < first_day; i++)
		main.append(empty_grid)
	for(let i = 0; i < number_of_days; i++){
		if((i+1) == today.getDate() && month == today.getMonth()+1 && year == today.getFullYear())
			main.append(grid_today+(i+1)+end)
		else
			main.append(grid+(i+1)+end)
	}
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
	month -= 1;
	if(month < 1){
		year -= 1;
		month = 12;
	}
	getCalendar(month, year);
}

function Go(){
	month = document.getElementById('months').selectedIndex + 1;
	year = parseInt($('#year').val());
	getCalendar(month, year);
}

function main(){
	date = new Date()
	year = date.getFullYear();
	month = date.getMonth() + 1;
	getCalendar(month, year);
}

main()
