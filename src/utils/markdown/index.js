import { micromark } from 'micromark'
import { gfm, gfmHtml } from 'micromark-extension-gfm'
import { underline, underlineHtml } from './underline'
import { usertag, usertagHtml } from './usertag'
import { directive, directiveHtml } from 'micromark-extension-directive'

export default (text, { textFormatting }) => {
	if (textFormatting) {
		let gfmDisabled = []

		if (!textFormatting.linkify) {
			gfmDisabled = ['literalAutolink', 'literalAutolinkEmail']
		}

		const markdown = micromark(
			text.replaceAll('<usertag>', '<@').replaceAll('</usertag>', '>'),
			{
				extensions: [
					{
						...gfm(),
						disable: { null: gfmDisabled }
					},
					underline,
					usertag,
          directive()
				],
				htmlExtensions: [
					gfmHtml(),
					underlineHtml,
					usertagHtml(textFormatting.users),
          directiveHtml({ rainbow })
				]
			}
		)

		if (textFormatting.singleLine) {
			const element = document.createElement('div')

			element.innerHTML = markdown

			return [
				{
					types: [],
					value: element.innerText
				}
			]
		}

		return [
			{
				types: ['markdown'],
				value: markdown
			}
		]
	}

	return [
		{
			types: [],
			value: text
		}
	]
}

/**
 * @this {import('micromark-util-types').CompileContext}
 * @type {import('micromark-extension-directive').Handle}
 * @returns {undefined}
 */
function rainbow(d) {
  if (d.type !== 'textDirective') return false

  this.tag('<span class="vac-effects-rainbow">')
  this.raw(this.encode(d.label))
  this.tag('</span>')
}
