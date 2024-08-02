
/**Verkürzte Form für document.getElementById(id).
 * @param {string} id 
 * @returns {HTMLElement}
 */
const $get = (id) => document.getElementById(id);

/**Gibt den Wert des Input-Elements zurück.
 * @param {string} id
 * @returns {string|number}
 */
const $v = (id) => {
    /**@type {HTMLInputElement} */
    let el = $get(id);
    return el['type'] == 'number' ? Number(el.value) : el.value;
}

/**Gibt an, ob ein Input-Element leer ist.
 * 
 * @param {string} id 
 * @returns {boolean}
 */
const $is_null = (id) => $get(id).value == "";

/**Setzt den Wert eines Input-Elements.
 * 
 * @param {string} id 
 * @param {string|number} value
 */
const $s = (id, value) => $get(id).value = value;


/**Erstellt ein Element
 * 
 * @param {string} name 
 * @param {string} id 
 * @returns {HTMLElement}
 */
const $create = (name, id = null) => {
    let element = document.createElement(name);
    if (id) element.id = id;
    return element;
};

/**Erstellt eine Tabelle.
 * @param {string[]} headers value:type
 * @returns {HTMLDivElement}
*/
const $create_table = (...headers) => {
    if (headers.length == 0 || headers.length > 12) {
        console.error('maximal 12 parameter erlaubt!');
        return;
    }
    headers.forEach((e, i) => {
        if (!e.includes(':')) {
            console.error('Beim ' + i + '-ten header gibt es keine Typzuweisung');
        }
    })

    let table = $create('div');
    table.classList.add('grid');
    table.classList.add(`grid-${headers.length}`);

    headers.forEach((e, i) => {
        let header = $create('p');
        header.classList.add('grid-header');
        header.innerHTML = e.split(':')[0];
        header.type = e.split(':')[1];
        if(e.split(':')[2] == 'readonly') header.readOnly = true;
        table.appendChild(header);
    })
    return table;

}
/**Gibt alle p-(Header)-Elemente von gegebener Tabelle zurück.
 * 
 * @param {HTMLDivElement} table 
 * @returns {HTMLParagraphElement[]}
 */
const $get_headers = (table) => Array.from(table.getElementsByClassName('grid-header'));

/**Gibt alle Header der Tabelle zurück
 * 
 * @param {HTMLDivElement} table 
 * @returns {string[]}
 */
const $get_header_labels = (table) => $get_headers(table).map(e => e.innerHTML)

/**Gibt alle Typen der jeweiligen Spalte zurück
 * 
 * @param {HTMLDivElement} table 
 * @returns {string[]}
 */
const $get_header_types = (table) =>  $get_headers(table).map(e => e.type)


/**Fügt zur Tabelle eine Zeile hinzu
 * 
 * @param {HTMLDivElement} table 
 * @param  {...(string|number)} values 
 */
const $table_new_row = (table, ...values) => {
    while(values.length < $get_headers(table).length) values.push(null);
    values.forEach((e, i) => {
        if(i >= $get_headers(table).length){
            return;
        }
        let input = $create('input');
        input['type'] = $get_header_types(table)[i];
        input.className = $get_headers(table)[i].innerHTML;
        input.readOnly = $get_headers(table)[i].readOnly;
        input.value = e;

        table.appendChild(input);
    })
};

/**Wandelt die Tablle in eine Map um
 * @param {HTMLDivElement} table
 * @returns {Map<string,(string|number)[]>}
 */
const $table_to_map = (table) => {
    let map = new Map();
    Array.from(table.getElementsByTagName('input'))
        .forEach(e => {
            if (map.has(e.className)) {
                let x = map.get(e.className);
                x.push(e.value);
                map.set(e.className, x);
            }
            else {
                map.set(e.className, [e.value]);
            }
        })
    return map;
}

/**Gibt an wie viele Zeilen diese Tabelle hat
 * 
 * @param {HTMLDivElement} table 
 * @returns {number}
 */
const $table_rows = (table) => {
    let m = $table_to_map(table);
    return m.get($get_headers(table)[0].innerHTML).length;
}


/**Gibt eine Zeile als Map aus
 * 
 * @param {HTMLDivElement} table 
 * @param {number} row 
 * @returns {Map<string,string|number>}
 */
const $table_get_row = (table, row) => {
    let m = $table_to_map(table);
    let ret = new Map();
    $get_header_labels(table).forEach(e => {
        ret.set(e, m.get(e)[row])
    })
    return ret;
}


/**Wandelt die Tabelle in eine m x n Matrix um.
 * 
 * @param {HTMLDivElement} table 
 * @returns {(string|number)[][]}
 */
const $table_to_2Darray = (table) => {

    let ret = [];
    for (let i = 0; i < $table_rows(table); i++) {
        let row = [];
        $table_get_row(table, i).forEach((v, k) => {
            row.push(v);
        });
        ret.push(row);
    }
    return ret;

}


/**Gibt das Element bei Zeile-r und Spalte-c zurück.
 * 
 * @param {HTMLDivElement} table 
 * @param {number} c Spalte
 * @param {number} r Zeile
 */
const $table_get_element = (table, c, r) => table.getElementsByTagName('input')[c + $get_headers(table).length * r]

/**Setzt das Element bei Zeile-r und Spalte-c neu.
 * 
 * @param {HTMLDivElement} table 
 * @param {string|number} value 
 * @param {number} c Spalte
 * @param {number} r Zeile
 */
const $table_set = (table, value, c, r) => $table_get_element(table, c, r).value = value;


/********************************** */

let imported_files_js = 0;

/**Importiert eine Javascript-Datei
 * 
 * @param {string} path Pfad ab aktivem HTML-File
 */
const importJs = (path) => {


    let e = document.createElement("script");
    e.src = path;
    document.body.appendChild(e);
    imported_files_js++;

}
/**Importiert eine CSS-Datei
 * 
 * @param {string} path Pfad ab aktivem HTML-File
 */
const importCSS = (path) => {

    let e = document.createElement("link");
    e.href = path;
    e.rel = 'stylesheet';
    document.head.appendChild(e);

}



let button_id = 0;
/**Erstellt ein Button mit Verlinkung zu anderer HTML-Seite 
 * 
 * @param {string} folderName Ordnername
 * @param {string?} txt Alternativ-Text
 * @returns 
 */
const createFormButton = (folderName, txt = null) => {
    let f = document.createElement('form');
    let b = document.createElement('button');
    f.appendChild(b);
    document.body.appendChild(f);

    f.action = `../${folderName}/Page.html`;
    b.type = 'submit';
    if (txt) b.innerHTML = txt;
    else {
        b.innerHTML = folderName;
    }

    return b;
}
/**Erstellt ein Zeilenumbruch und fügt es bei parent ein
 * 
 * @param {HTMLElement?} parent
 */
const br = (parent = document.body) => parent.append(document.createElement('br'));


/*IMPORT-SECTION*****************************************************************************************

            Ab hier sollten neue Klassen nur mit der Datei addClass.vbs hinzugefügt werden.
            Dabei wird in lib eine neue Klasse erstellt und an den Stellen add_class und load_class werden Pseudoklassen und globale Variablen generiert.
            
            Genauso sollten neue HTML-Seiten nur mit der Datei addPage.vbs hinzugefügt werden.
            Diese Seite wird in ein Ordner gelegt. Zusätzlich liegt eine Main-Datei bei.
            In dieser Main Datei lassen sich alle auf diesem Wege importierten Klassen ohne Probleme anwenden.
            
            Diese Boot-Datei importiert diese Main-Funktion zum Schluss.
            Alle Klassen, welche ab hier importiert wurden, dürfen nur in dieser Main-Methode ausgeführt werden, andernfalls läuft das Program nicht.
            


*/
importCSS("../lib/Load.css");



class gameObject { };
importJs("../lib/gameObject.js");

class Rect extends gameObject { };
importJs("../lib/Rect.js");
load_rect = false;

class Circle extends gameObject { };
importJs("../lib/Circle.js");
load_circle = false;

class Vector2D extends gameObject { };
importJs("../lib/Vector2D.js");
load_vector2d = false;

class Image extends gameObject { };
importJs("../lib/Img.js");
load_img = false;

class Mouse extends gameObject { };
importJs("../lib/Mouse.js");
load_mouse = false;


class Canvas extends Object{
    /**@type {HTMLCanvasElement}*/ element
};
importJs('../lib/Canvas.js');
load_Canvas = false;
class Canvas3D extends Object{
    /**@type {HTMLDivElement}*/ view;
    /**@type {Canvas}*/ left;
    /**@type {Canvas}*/ right;
    /** @returns {Canvas3D}*/ static createSBSCanvas = () => {};
};
importJs('../lib/Canvas3D.js');
load_Canvas3D = false;

/*add_class*/ 



importJs("../lib/createCanvas.js");

importJs("Main.js");

// Set some load variables
load_main = true

let check_Main;
if (IMPORT)
    check_Main = setInterval(() => {
        try {
            //Main should only be runnable, if all classes are loaded.
            if (Main && load_rect && load_circle && load_vector2d && load_img && load_mouse&& load_Canvas&& load_Canvas3D/*load_class*/ && load_main) {
                load_main = false;
                Main();
                clearInterval(check_Main);
            }
            console.log("load...")

        }
        catch (e) {

        }
    }, 1);

/**Voreinstellung für bestimmte Klassen*/
//Array.from(document.getElementsByClassName('ID')).forEach(e => console.log(e))
