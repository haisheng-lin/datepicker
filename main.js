(function () {
  const datepicker = window.datepicker;
  let monthData;
  let $wrapper;
  datepicker.buildUi = function (year, month) {
    monthData = datepicker.getMonthData(year, month);
    let html = `
      <div class="ui-datepicker-header">
        <a href="#" class="ui-datepicker-btn ui-datepicker-prev-btn">&lt;</a>
        <a href="#" class="ui-datepicker-btn ui-datepicker-next-btn">&gt;</a>
        <span class="ui-datepicker-curr-month">${monthData.year}-${monthData.month}</span>
      </div>
      <div class="ui-datepicker-body">
        <table>
          <thead>
            <tr>
              <th>一</th>
              <th>二</th>
              <th>三</th>
              <th>四</th>
              <th>五</th>
              <th>六</th>
              <th>日</th>
            </tr>
          </thead>
          <tbody>`
    for (let i = 0; i < monthData.days.length; i++) {
      const date = monthData.days[i];
      if (i % 7 === 0) {
        html += `<tr>`;
      }
      html += `<td data-date="${date.date}">${date.showDate}</td>`;
      if (i % 7 === 6) {
        html += `</tr>`;
      }
    }
    html += `</tbody>
        </table>
      </div>
    `;
    return html;
  };

  datepicker.render = function (direction) {
    let year, month;
    if (monthData) {
      year = monthData.year;
      month = monthData.month;
    }
    
    if (direction === 'prev') {
      month--;
      if (month === 0) {
        year--;
        month = 12;
      }
    } else if (direction === 'next') {
      month++;
      if (month === 13) {
        year++;
        month = 1;
      }
    }

    const html = datepicker.buildUi(year, month);
    $wrapper = document.querySelector('.ui-datepicker-wrapper');
    if (!$wrapper) {
      $wrapper = document.createElement('div');
      $wrapper.className = 'ui-datepicker-wrapper';
      document.body.appendChild($wrapper);
    }
    $wrapper.innerHTML = html;
  }

  datepicker.init = function (input) {
    datepicker.render();

    let $input = document.querySelector(input);
    let isOpen = false;
    $input.addEventListener('click', function () {
      if (isOpen) {
        $wrapper.classList.remove('ui-datepicker-wrapper-show');
        isOpen = false;
      } else {
        $wrapper.classList.add('ui-datepicker-wrapper-show');
        const left = $input.offsetLeft;
        const top = $input.offsetTop;
        const height = $input.clientHeight;
        $wrapper.style.top = top + height + 5 + 'px';
        $wrapper.style.left = left + 'px';
        isOpen = true;
      }
    }, false);

    $wrapper.addEventListener('click', function (e) {
      const $target = e.target;
      if ($target.classList.contains('ui-datepicker-btn')) {
        if ($target.classList.contains('ui-datepicker-prev-btn')) {
          datepicker.render('prev');
        } else if ($target.classList.contains('ui-datepicker-next-btn')) {
          datepicker.render('next');
        }
      }
    }, false);

    $wrapper.addEventListener('click', function (e) {
      const $target = e.target;
      if ($target.tagName.toLowerCase() === 'td') {
        const date = new Date(monthData.year, monthData.month - 1, $target.dataset.date);
        $input.value = format(date);
        $wrapper.classList.remove('ui-datepicker-wrapper-show');
        isOpen = false;
      }
    });
  }

  /**
   * @param {Date} date
   * @returns {string}
   */
  function format (date) {
    const padding = function (num) {
      return num <= 9 ? `0${num}` : num.toString();
    }
    const year = date.getFullYear();
    const month = padding(date.getMonth() + 1);
    const day = padding(date.getDate());
    return `${year}-${month}-${day}`;
  }
}());