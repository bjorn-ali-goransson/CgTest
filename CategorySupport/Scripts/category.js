
/* APP */

portal.addApp(class Category extends App {
    constructor() {
        super();

        this.translations = translations.scopeTo('Category');

        this.addBlade(ListCategories);
        this.addBlade(EditCategory);
    }
});



/* LIST */

class ListCategories extends Blade {
    constructor(app) {
        super();

        this.setTitle(app.translations.get('AllCategories'));

        var dataTable;

        this.setToolbar(
            new PortalButton(app.translations.get('New'), () => app.closeBladesAfter(this).openBlade('EditCategory').onClose(message => dataTable.update())),
        );

        this.setContent(
            dataTable = new DataTable(
                'category',
                [
                    app.translations.get('Name'),
                    app.translations.get('UrlSegment'),
                ],
                [
                    (dataTable, element, item) => element.innerText = item.Item.Name,
                    (dataTable, element, item) => element.innerText = item.Url,
                ],
                (dataTable, element, item) => {
                    new PortalButton(app.translations.get('Edit'), () => app.closeBladesAfter(this).openBlade('EditCategory', item.Item).onClose(message => dataTable.update())).appendTo(element);
                    new PortalLinkButton(app.translations.get('Open'), item.Url, '_blank').appendTo(element);
                },
            )
        );
    }
}



/* EDIT */

class EditCategory extends Blade {
    constructor(app) {
        super();

        this.app = app;
        this.formBuilder = new FormBuilder;
        this.formFieldTypes = formFieldTypes;
        this.formFieldProvider = new FormFieldProvider();
        this.formFields = this.formFieldProvider.getFor('category');

        this.setTitle(app.translations.get('New'));

        var save = item => {
            return fetch('/CategorySupport/Save', {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            });
        }

        this.setContent();

        this.setToolbar(
            new PortalButton(app.translations.get('Save'), () => save(this.model).then(() => app.closeBlade(this, 'saved'))),
            new PortalButton(app.translations.get('Cancel'), () => app.closeBlade(this)),
        );
    }

    open(item) {
        this.model = item || {};

        this.formFields
            .then(formFields => this.setContent(this.formBuilder.build(this.model, formFields, this.formFieldTypes, this.app.translations)));
    }
}