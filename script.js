(function () {
	const isFullTime = new URL(location)['searchParams'].get('isFullTime') === 'true';
	const time = document.getElementById('time');
	const date = document.getElementById('date');
	const todo = document.getElementById('todo');
	const daysOfWeek = ['월', '화', '수', '목', '금', '토', '일'];

	function appendTodo(content) {
		const todoItem = document.createElement('li');
		todoItem['textContent'] = content;

		todoItem.addEventListener('click', function () {
			todoItem.remove();

			const previousTodos = JSON.parse(localStorage.getItem('todo'));
			const todoIndex = previousTodos.indexOf(content);

			localStorage.setItem('todo', JSON.stringify(previousTodos.slice(0, todoIndex).concat(previousTodos.slice(todoIndex + 1))));

			return;
		});

		todo.appendChild(todoItem);

		return;
	}

	setInterval(function () {
		const _date = new Date();
		let hour = _date.getHours();

		if(!isFullTime && hour > 12) {
			hour %= 12;
		}

		time['textContent'] = String(hour).padStart(2, '0') + ':' + String(_date.getMinutes()).padStart(2, '0') + ':' + String(_date.getSeconds()).padStart(2, '0');
		date['textContent'] = String(_date.getFullYear()) + '-' + String(_date.getMonth() + 1).padStart(2, '0') + '-' + String(_date.getDate()).padStart(2, '0') + ' (' + daysOfWeek[(_date.getDay() + 6) % 7] + ')';

		return;
	}, 1000);

	const timeoutId = setTimeout(function () {
		try {
			const previousTodosString = localStorage.getItem('todo');
	
			if(previousTodosString !== null) {
				const previousTodos = JSON.parse(previousTodosString);
	
				if(Array.isArray(previousTodos)) {
					for(let i = 0; i < previousTodos['length']; i++) {
						appendTodo(previousTodos[i]);
					}
				} else {
					throw '';
				}
			} else {
				throw '';
			}
		} catch {
			localStorage.setItem('todo', '[]');
		}

		clearTimeout(timeoutId);

		return;
	}, 1000);

	window.addEventListener('keypress', function (event) {
		if(event['key'] === 'a') {
			const content = prompt('Todo:');

			if(content !== null) {
				appendTodo(content);
				
				const previousTodos = JSON.parse(localStorage.getItem('todo'));
				previousTodos.push(content);
				localStorage.setItem('todo', JSON.stringify(previousTodos));
			}
		}

		return;
	});

	return;
})();