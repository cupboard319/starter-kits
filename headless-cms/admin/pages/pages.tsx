import * as React from 'react'
import {
	CreatePage,
	DataGridPage,
	EditPage,
	EntityAccessor,
	EnumCell,
	FeedbackRenderer,
	GenericPage,
	Link,
	LinkButton,
	TextCell,
} from '@contember/admin'
import { PageForm, PageSideForm } from '../forms/pageForms'
import locale from '../locales'
import { UrlCell } from '../components/UrlCell'

function clearSlugWhenPageHasRole(getEntityAccessor: EntityAccessor.GetEntityAccessor) {
	const entity = getEntityAccessor()
	if (entity.getField('role').value !== null) {
		entity.getField('slug').updateValue(null)
	}
}

	<DataGridPage
		entities="Page"
		itemsPerPage={50}
		rendererProps={{ title: locale['Pages'], actions: <LinkButton to="pageCreate">{locale['Add page']}</LinkButton> }}
	>
		<TextCell
			field="seo.title"
			header={locale["Title"]}
			format={(scalar) => <Link to="pageEdit(id: $entity.id)">{scalar}</Link>}
		/>
		<EnumCell
			field="role"
			header={locale["Role"]}
			options={{
				homePage: locale["Home page"],
				error404Page: locale["Error 404"],
				blogPage: locale["Blog page"],
			}}
		/>
		<UrlCell field="slug" header={locale["Url"]} />
	</DataGridPage>
)

export const PageCreate = (
	<CreatePage
		entity="Page"
		rendererProps={{ title: locale["Add page"], side: <PageSideForm /> }}
		redirectOnSuccess="page(id: $entity.id)"
		onBeforePersist={(entityAccessor) => clearSlugWhenPageHasRole(entityAccessor)}
	>
		<PageForm />
	</CreatePage>
)

export const Page = (
	<EditPage
		entity="Page(id=$id)"
		pageName="page"
		rendererProps={{ title: locale["Edit page"], side: <PageSideForm isEditPage /> }}
		onBeforePersist={(entityAccessor) => clearSlugWhenPageHasRole(entityAccessor)}
	>
		<PageForm />
	</EditPage>
)
