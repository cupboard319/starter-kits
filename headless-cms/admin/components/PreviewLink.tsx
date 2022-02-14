import * as React from 'react'
import { Component, Field, useEnvironment, useField } from '@contember/admin'
import locale from '../locales'

type PreviewLinkProps = {
	slugField: string,
	prefix?: string,
	path?: string
}

export const PreviewLink = Component<PreviewLinkProps>(
	({ slugField, path, prefix }) => {
		const webUrl = useEnvironment().getValue('WEB_URL')
		const { value: slug } = useField<string>(slugField)

		if (!path) {
			path = prefix ? `${prefix}${slug}` : `/${slug}`
		}

		return (
			<a href={`${webUrl}${path}`} target="_blank">
				{locale['Preview']}
			</a>
		)
	},
	({ slugField }) => (
		<Field field={slugField} />
	),
	'PreviewLink',
)
