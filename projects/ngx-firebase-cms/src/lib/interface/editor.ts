export interface CustomClass {
    name: string;
    class: string;
    tag?: string;
}

export interface Font {
    name: string;
    class: string;
}

export interface AngularEditorConfig {
    editable?: boolean;
    spellcheck?: boolean;
    height?: 'auto' | string;
    minHeight?: '0' | string;
    maxHeight?: 'auto' | string;
    width?: 'auto' | string;
    minWidth?: '0' | string;
    translate?: 'yes' | 'now' | string;
    enableToolbar?: boolean;
    showToolbar?: boolean;
    placeholder?: string;
    defaultParagraphSeparator?: string;
    defaultFontName?: string;
    defaultFontSize?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | string;
    uploadUrl?: string;
    fonts?: Font[];
    customClasses?: CustomClass[];
}

export const angularEditorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
        { class: 'arial', name: 'Arial' },
        { class: 'times-new-roman', name: 'Times New Roman' },
    ],
    uploadUrl: 'v1/image',
};
