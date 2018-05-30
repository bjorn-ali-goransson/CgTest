
/* APP */

portal.addApp(class Product extends App {
    constructor() {
        super();

        this.translations = translations.scopeTo('Product');

        this.addBlade(ListProducts);
        this.addBlade(EditProduct);
    }
});



/* LIST */

class ListProducts extends Blade {
    constructor(app) {
        super();

        this.setTitle(app.translations.get('AllProducts'));

        var dataTable;

        this.setToolbar(
            new PortalButton(app.translations.get('New'), () => app.closeBladesAfter(this).openBlade('EditProduct').onClose(message => dataTable.update())),
        );

        this.setContent(
            dataTable = new DataTable(
                'product',
                [
                    app.translations.get('ArticleNo'),
                    app.translations.get('Name'),
                ],
                [
                    (dataTable, element, item) => element.innerText = item.Item.ArticleNo,
                    (dataTable, element, item) => element.innerText = item.Item.Name,
                ],
                (dataTable, element, item) => {
                    new PortalButton(app.translations.get('Edit'), () => app.closeBladesAfter(this).openBlade('EditProduct', item.Item).onClose(message => dataTable.update())).appendTo(element);
                    new PortalLinkButton(app.translations.get('Open'), item.Url, '_blank').appendTo(element);
                },
            )
        );
    }
}



/* EDIT */

class EditProduct extends Blade {
    constructor(app) {
        super();

        this.app = app;
        this.formBuilder = new FormBuilder;
        this.formFieldTypes = formFieldTypes;
        this.formFieldProvider = new FormFieldProvider();
        this.formFields = this.formFieldProvider.getFor('product');

        this.setTitle(app.translations.get('New'));

        var save = item => {
            return fetch('/ProductSupport/Save', {
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