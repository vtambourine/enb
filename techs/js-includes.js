/**
 * js-includes
 * ===========
 *
 * Собирает *js*-файлы по deps'ам инклудами, сохраняет в виде `?.js`.
 * Может пригодиться в паре с ycssjs (как fastcgi-модуль).
 *
 * **Опции**
 *
 * * *String* **target** — Результирующий таргет. По умолчанию — `?.js`.
 * * *String* **filesTarget** — files-таргет, на основе которого получается список исходных файлов
 *   (его предоставляет технология `files`). По умолчанию — `?.files`.
 *
 * **Пример**
 *
 * ```javascript
 * nodeConfig.addTech(require('enb/techs/js-includes'));
 */
var inherit = require('inherit'),
    fs = require('graceful-fs');

module.exports = require('../lib/build-flow').create()
    .name('js')
    .target('target', '?.js')
    .useFileList('js')
    .builder(function(sourceFiles) {
        var node = this.node;
        return sourceFiles.map(function(file) {
            return 'include("' + node.relativePath(file.fullname) + '");';
        }).join('\n');
    })
    .createTech();
