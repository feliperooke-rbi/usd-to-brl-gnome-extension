/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

import GObject from 'gi://GObject';
import St from 'gi://St';
import Clutter from 'gi://Clutter';
import GLib from 'gi://GLib';
import Soup from 'gi://Soup';
import {get} from './request.js';

import {Extension, gettext as _} from 'resource:///org/gnome/shell/extensions/extension.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
import * as PopupMenu from 'resource:///org/gnome/shell/ui/popupMenu.js';

import * as Main from 'resource:///org/gnome/shell/ui/main.js';

const LOG_PREFIX = "[usd-to-brl@rooke]"

const Indicator = GObject.registerClass(
class Indicator extends PanelMenu.Button {
    _init() {
        super._init(0.0, _('Cotação do Dólar'));

        this._label = new St.Label({
            text: _('Carregando...'),
            style_class: 'menu-item-text',
            y_align: Clutter.ActorAlign.CENTER,
        });
        this.add_child(this._label);

        this._updateRate();

        this._refreshId = GLib.timeout_add_seconds(GLib.PRIORITY_DEFAULT, 60, () => {
            this._updateRate();
            return true; // Retorna true para continuar o timer
        });

        // this.add_child(new St.Icon({
        //     icon_name: 'face-smile-symbolic',
        //     style_class: 'system-status-icon',
        // }));

        // let item = new PopupMenu.PopupMenuItem(_('Show Notification'));
        this.connect("button-press-event", () => {
            this._updateRate();
        });
        // this.menu.addMenuItem(item);
    }

    async _updateRate() {

        try {
            const url = "https://economia.awesomeapi.com.br/json/last/USD-BRL";
            const res = await get(url);
            const response = JSON.parse(res.body);
            // console.log(`${LOG_PREFIX} ${JSON.stringify(response)}`)
            // // Verifica se os dados estão disponíveis na propriedade "USDBRL"
            if (response && response.USDBRL && response.USDBRL.bid) {
                let rate = response.USDBRL.bid;
                this._label.set_text(`USD: ${rate}`);
            } else {
                this._label.set_text(_('Dados indisponíveis'));
            }
        } catch (error) {
            this._label.set_text(_('Erro ao carregar'));
            console.log(error);
        }
    }

    destroy() {
        if (this._refreshId) {
            GLib.source_remove(this._refreshId);
            this._refreshId = null;
        }
        super.destroy();
    }
});

export default class IndicatorExampleExtension extends Extension {
    enable() {
        this._indicator = new Indicator();
        Main.panel.addToStatusArea(this.uuid, this._indicator);
    }

    disable() {
        if (this._indicator) {
            this._indicator.destroy();
            this._indicator = null;
        }
    }
}
