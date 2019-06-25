const _elements = [{
        id: "e78b7690-f0cc-4728-b232-35858ac2411b",
        name: 'Остановка 1'
    },
    {
        id: "4e842702-2cf8-403e-9d2a-26c66c5c592a",
        name: 'Остановка 2'
    },
    {
        id: "a0694900-f1d7-4c8b-8333-3677695de64f",
        name: 'Остановка 3'
    },
    {
        id: "bdce2017-de28-48e6-8c90-ed21d446d884",
        name: 'Остановка 4'
    },
    {
        id: "1b3b4d49-a83f-43b8-96db-1e03c9adc75b",
        name: 'Остановка 5'
    },
    {
        id: "ecd5b8dc-a6b9-41ab-8070-dbafdd76f9db",
        name: 'Остановка 6'
    },
    {
        id: "eed197a8-5acc-472d-bf0d-2260fae8d5f4",
        name: 'Остановка 7'
    },
    {
        id: "e37fce76-5f47-4d6b-9b7c-eb62d2ed72eb",
        name: 'Остановка 8'
    },
    {
        id: "cd0322da-915a-425b-97e4-1538d7ef121d",
        name: 'Остановка 9'
    },
    {
        id: "aef437f0-fda1-4b99-9127-36c2ade438ef",
        name: 'Остановка 10'
    },
    {
        id: "e9ac920a-dd0a-4900-9798-467852b62d03",
        name: 'Остановка 11'
    },
    {
        id: "db543336-b3fb-42a9-8921-7515232f18b4",
        name: 'Остановка 12'
    },
    {
        id: "71898412-4f2c-4ef6-8643-1f76d0588d3c",
        name: 'Остановка 13'
    },
    {
        id: "bca68906-c5a0-4373-8b86-410a25369cce",
        name: 'Остановка 14'
    },
    {
        id: "bca68906-c5a0-4373-8b86-412325369cce",
        name: 'Остановка 15'
    }
];

const _result = [{
        src: "e78b7690-f0cc-4728-b232-35858ac2411b",
        dst: "4e842702-2cf8-403e-9d2a-26c66c5c592a",
        value: 300
    },
    {
        src: "e78b7690-f0cc-4728-b232-35858ac2411b",
        dst: "4e842702-2cf8-403e-9d2a-26c66c5c592a",
        value: 300
    },
    {
        src: "e37fce76-5f47-4d6b-9b7c-eb62d2ed72eb",
        dst: "a0694900-f1d7-4c8b-8333-3677695de64f",
        value: 325
    },
    {
        src: "e78b7690-f0cc-4728-b232-35858ac2411b",
        dst: "bdce2017-de28-48e6-8c90-ed21d446d884",
        value: 400
    },
    {
        src: "e9ac920a-dd0a-4900-9798-467852b62d03",
        dst: "1b3b4d49-a83f-43b8-96db-1e03c9adc75b",
        value: 200
    },
    {
        src: "e9ac920a-dd0a-4900-9798-467852b62d03",
        dst: "a0694900-f1d7-4c8b-8333-3677695de64f",
        value: 400
    },
    {
        src: "e78b7690-f0cc-4728-b232-35858ac2411b",
        dst: "db543336-b3fb-42a9-8921-7515232f18b4",
        value: 700
    },
    {
        src: "eed197a8-5acc-472d-bf0d-2260fae8d5f4",
        dst: "aef437f0-fda1-4b99-9127-36c2ade438ef",
        value: 800
    }
];

const _matrix = prepareMdmMatrix(_elements);

let _grid;

$(() => {

    var length = _elements.length;
    var root = $('#gridContainer');
    var table = $('<table>')
        .css('width', '100%')
        .css('height', '98vh');

    // Consolidation row
    var conslRow = $("<tr>").append(
        $("<td>")
        .append("Пункт отправления")
        .attr({
            rowSpan: length + 2
        })
        .addClass('test'),
        $("<td>")
        .attr({
            colSpan: length + 1
        })
        .text("Пункт назначения")
        .addClass('text-center')
    ).appendTo(table);
    // Headers row
    var headerTr = $("<tr>")
        .css('min-height', '72px')
        .append(
            $("<td>").addClass('disabled')
        ).appendTo(table);

    for (let column = 0; column < _elements.length; column++) {
        var headerCont = $('<td>')
            .appendTo(headerTr);

        drawVerticalText(_elements[column].name)
            .appendTo(headerCont);
    }

    // Fill data
    // Row
    for (let y = 0; y < length; y++) {
        const tr = $('<tr>').append($("<td>").text(_elements[y].name).attr({
            'data-from': _elements[y].id
        }));
        for (let x = 0; x < length; x++) {
            // Data item
            var item = _matrix[y][x];
            //console.log(item);

            var td = $("<td>")
            let inp = $("<input>")
            if (_elements[y].id == _elements[x].id) {
                inp.addClass('disabled')
            }

            td.attr({
                'data-toggle': 'tooltip',
                'data-placement': 'right',
                'title': `${_elements[x].name} x ${_elements[y].name}`
            }).append(
                inp.val(getValue([_elements[y].id, _elements[x].id])).attr({
                    'data-from': _elements[y].id,
                    'data-to': _elements[x].id
                })
            );
            td.mouseover(e => {
                let src = event.target.getAttribute('data-from'),
                    dst = event.target.getAttribute('data-to'),
                    inputs = document.querySelectorAll('input'),
                    tds = document.querySelectorAll('td')
                if (src === dst) {
                    event.target.disabled = true
                    event.target.title = 'X'
                }
                inputs.forEach(item => {
                    if ((src !== dst) && (item.getAttribute('data-from') == src)) {
                        item.style.background = '#ccc'
                    } else if ((src !== dst) && (item.getAttribute('data-to') == dst)) {
                        item.style.background = '#ccc'
                    } else {
                        item.style.background = 'transparent'
                    }
                })
                tds.forEach(item => {
                    if((src !== dst) && (item.getAttribute('data-from') == src)){
                        item.style.background = '#ccc'
                    }else if((src !== dst) && (item.getAttribute('data-to') == dst)){
                        item.style.background = '#ccc'
                    } else {
                        item.style.background = 'transparent'
                    }
                })

            })
            td.change(function (event) {
                let src = event.target.getAttribute('data-from'),
                    dst = event.target.getAttribute('data-to'),
                    inputs = document.querySelectorAll('input')
                if (src == dst) {
                    event.target.disabled = true
                }
                for (item of _result) {
                    if ((src == item.src && dst == item.dst) || (dst == item.src && src == item.dst)) {
                        item.value = Number(event.target.value)
                    } else {
                        let obj = {}
                        obj.src = src
                        obj.dst = dst
                        obj.value = Number(event.target.value)
                        _result.push(obj)
                    }
                    inputs.forEach(inp => {
                        if ((inp.getAttribute('data-from') == item.dst && inp.getAttribute('data-to') == item.src) || (inp.getAttribute('data-from') == item.src && inp.getAttribute('data-to') == item.dst)) {
                            inp.value = item.value
                        }
                    })
                }
                //console.log(`successfully updated ${src} x ${dst} to new value ${event.target.value}`)

            });
            td.on('keypress',function(e) {
                if(e.which == 13) {
                    if(e.target.parentElement.nextElementSibling){
                        e.target.parentElement.nextElementSibling.firstChild.focus()
                    } else {
                        e.target.parentElement.parentElement.nextElementSibling.firstChild.nextElementSibling.firstChild.focus()
                    }
                    
                }
            });
            td.appendTo(tr);
        }
        tr.appendTo(table);
    }
    table.appendTo(root);

});

function drawVerticalText(text, deg = 90, translate = 30) {
    var el = $('<div>');
    //el.append('<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" viewBox="0,0,32,96"></svg>');
    //el.children('svg').append(`<text x="0" y="20" transform="translate(${translate}) rotate(${deg})">${text}</text>`);
    el.html(text).addClass('test2');

    return el;
}

function prepareColumnSet(columns) {
    return columns.map(column => {
        return {
            caption: column,
            width: 'auto',
            minWidth: '64px',
            alignment: 'center',
            headerCellTemplate: (header, info) => {
                // console.log("headerCellTemplate", header, info);
                header.css('height', '128px');
                header.addClass('align-bottom');
                $("<div>")
                    .append(
                        $('<p>')
                        .text(info.column.caption)
                        .addClass('rotate')
                    )
                    .appendTo(header);
            },
        }
    })
}

/// prepare matrix for points
function prepareMdmMatrix(arr) {
    var result = [];
    // Перебираем
    for (let y = 0; y < arr.length; y++) {
        // Строка - пункти отправления
        const src = arr[y];
        const row = [];
        // Перебираем столбцы
        for (let x = 0; x < arr.length; x++) {
            // Столбец - назначение
            const dst = arr[x];
            row.push({
                src,
                dst,
                value: 650
            });
        }
        result.push(row);
    }

    return result;
}

function getValue(arr) {
    let result = '-'
    _result.forEach(function (item) {
        //console.log(arr[0],item.src)
        if ((arr[0] == item.src && arr[1] == item.dst) || (arr[1] == item.src && arr[0] == item.dst)) {
            result = item.value
        }
    })
    return result

}
