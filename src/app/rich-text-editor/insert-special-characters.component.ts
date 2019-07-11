/**
 * RTE Custom-Toolbar Sample
 */
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Browser, addClass } from '@syncfusion/ej2-base';
import { ToolbarService, NodeSelection, LinkService, ImageService } from '@syncfusion/ej2-angular-richtexteditor';
import { RichTextEditorComponent, HtmlEditorService, QuickToolbarService } from '@syncfusion/ej2-angular-richtexteditor';
import { Dialog } from '@syncfusion/ej2-popups';

@Component({
    selector: 'control-content',
    templateUrl: 'insert-special-characters.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['style.css'],
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService]
})

export class InsertSpecialCharactersComponent {
    @ViewChild('customRTE')
    public rteObj: RichTextEditorComponent;
    @ViewChild('Dialog')
    public dialogObj: Dialog;
    public selection: NodeSelection = new NodeSelection();
    public range: Range;
    public customBtn: any;
    public dialogCtn: any;
    public saveSelection: NodeSelection;
    public tools: object = {
        items: ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments', 'OrderedList',
        'UnorderedList', '|', 'CreateLink', 'Image', '|', 'SourceCode',
        {
            tooltipText: 'Insert Symbol',
            template: '<button class="e-tbar-btn e-btn" tabindex="-1" id="custom_tbar"  style="width:100%">'
                      + '<div class="e-tbar-btn-text" style="font-weight: 500;"> Ω</div></button>'
        }, '|', 'Undo', 'Redo'
        ]
    };
    public dlgButtons: any = [{ buttonModel: { content: "Insert", isPrimary: true }, click: this.onInsert.bind(this) },
    { buttonModel: { content: 'Cancel' }, click: this.dialogOverlay.bind(this) }];
    public header: string = 'Special Characters';
    public target: HTMLElement = document.getElementById('rteSection');
    public height: any = '350px';
    public onCreate(): void {
        this.customBtn = document.getElementById('custom_tbar') as HTMLElement;
        this.dialogCtn = document.getElementById('rteSpecial_char') as HTMLElement;
        this.dialogObj.target = document.getElementById('rteSection');
        this.customBtn.onclick = (e: Event) => {
            (this.rteObj.contentModule.getEditPanel() as HTMLElement).focus();
            this.dialogObj.element.style.display = '';
            this.range = this.selection.getRange(document);
            this.saveSelection = this.selection.save(this.range, document);
            this.dialogObj.show();
        };
    }
    public dialogCreate(): void {
        this.dialogCtn = document.getElementById('rteSpecial_char');
        this.dialogCtn.onclick = (e: Event) => {
            const target: HTMLElement = e.target as HTMLElement;
            const activeEle: Element = this.dialogObj.element.querySelector('.char_block.e-active');
            if (target.classList.contains('char_block')) {
                target.classList.add('e-active');
                if (activeEle) {
                    activeEle.classList.remove('e-active');
                }
            }
        };
    }
    public onInsert(): void {
        const activeEle: Element = this.dialogObj.element.querySelector('.char_block.e-active');
        if (activeEle) {
            if (this.rteObj.formatter.getUndoRedoStack().length === 0) {
                this.rteObj.formatter.saveData();
            }
            if (Browser.isDevice && Browser.isIos) {
                this.saveSelection.restore();
            }
            this.rteObj.executeCommand('insertText', activeEle.textContent);
            this.rteObj.formatter.saveData();
            (this.rteObj as any).formatter.enableUndo(this.rteObj);
        }
        this.dialogOverlay();
    }

    public dialogOverlay(): void {
        let activeEle: Element = this.dialogObj.element.querySelector('.char_block.e-active');
        if (activeEle) {
            activeEle.classList.remove('e-active');
        }
        this.dialogObj.hide();
    }
}