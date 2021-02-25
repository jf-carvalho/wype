Element.prototype.wype = function(options){

	setEWidth(options.data, this)

	run(options, this)

	const totalTime = getTotalTime(options)
	setInterval(() => {
		run(options, this)
	}, totalTime)
	
}

function run({
				data = [],
				interval = 2,
				typingSpeed = 50,
				delayBetween = 500,
				minimumTime = 1000
			}, e){

	const typing_time = {}
	for (var i = 0; i < data.length; i++) {
		typing_time[i] = typingSpeed * data[i].length
		if(typing_time[i] < minimumTime){
			typing_time[i] = minimumTime
		}
		typing_time[i] += delayBetween
	}

	data.forEach((word, i) => {
		
		i = i == 0 ? 0 : timer(i, typing_time)

		setTimeout(() => {
			e.innerText = ''
			type(word, e, interval, typingSpeed)
		}, i)

	})
}

function type(word, e, interval, typingSpeed ){
	const splitted = word.split('')
	let aux = 0;

	splitted.forEach((letter, i) => {
		setTimeout(() => {
			e.innerText += letter
		}, typingSpeed * i)
		aux ++
	})

	// setTimeout(() => {
		// untype(word, interval, e)
	// }, interval * aux)
}

function untype(word, interval, e){
	const splitted = word.split('')
	splitted.forEach((letter, i) => {
		setTimeout(() => {
			const new_s = e.innerText.slice(0, -1)
			e.innerText = new_s
		}, interval/2 * i)
	})
}

function timer(j, typing_time){
	
	let c = 0

	for (var i = j-1; i >= 0; i--) {
		c += typing_time[i]
	}

	return c
}

function getTotalTime({data, interval, typingSpeed, delayBetween, minimumTime}){
	const typing_time = []
	for (var i = 0; i < data.length; i++) {
		typing_time[i] = typingSpeed * data[i].length
		if(typing_time[i] < minimumTime){
			typing_time[i] = minimumTime
		}
	}

	const total = typing_time.reduce((acum, curr) => acum += curr + delayBetween)

	return total + delayBetween
}

function setEWidth(data, e){
	const longest = findLongestWord(data)
	const w = getTextWidth(longest, window.getComputedStyle(e).getPropertyValue('font'))
	e.parentElement.style.width = w + 'px'
}


function findLongestWord(data){
	longest = data[0]
	data.forEach(word => {
		if(word.length > longest.length){
			longest = word
		}
	})

	return longest
}


function getTextWidth(text, font) {
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
}