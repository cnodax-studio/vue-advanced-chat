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
          directiveHtml({ rainbow, blink, red, gold, silver, bronze, shake })
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
  if (d.type !== 'textDirective' && d.type !== 'containerDirective') return false

  const target = d.content ?? d.label

  this.tag('<span class="vac-effects-rainbow">')
  this.raw(target)
  this.tag('</span>')
}

/**
 * @this {import('micromark-util-types').CompileContext}
 * @type {import('micromark-extension-directive').Handle}
 * @returns {undefined}
 */
function blink(d) {
  if (d.type !== 'textDirective' && d.type !== 'containerDirective') return false

  const target = d.content ?? d.label

  this.tag('<span class="vac-effects-blink">')
  this.raw(target)
  this.tag('</span>')
}

/**
 * @this {import('micromark-util-types').CompileContext}
 * @type {import('micromark-extension-directive').Handle}
 * @returns {undefined}
 */
function red(d) {
  if (d.type !== 'textDirective' && d.type !== 'containerDirective') return false

  const target = d.content ?? d.label

  this.tag('<span style="color: red">')
  this.raw(target)
  this.tag('</span>')
}

/**
 * @this {import('micromark-util-types').CompileContext}
 * @type {import('micromark-extension-directive').Handle}
 * @returns {undefined}
 */
function gold(d) {
  if (d.type !== 'textDirective' && d.type !== 'containerDirective') return false

  const target = d.content ?? d.label

  this.tag('<span class="vac-effects-gold">')
  this.raw(target)
  this.tag('</span>')
}

/**
 * @this {import('micromark-util-types').CompileContext}
 * @type {import('micromark-extension-directive').Handle}
 * @returns {undefined}
 */
function silver(d) {
  if (d.type !== 'textDirective' && d.type !== 'containerDirective') return false

  const target = d.content ?? d.label

  this.tag('<span class="vac-effects-silver">')
  this.raw(target)
  this.tag('</span>')
}

/**
 * @this {import('micromark-util-types').CompileContext}
 * @type {import('micromark-extension-directive').Handle}
 * @returns {undefined}
 */
function bronze(d) {
  if (d.type !== 'textDirective' && d.type !== 'containerDirective') return false

  const target = d.content ?? d.label

  this.tag('<span class="vac-effects-bronze">')
  this.raw(target)
  this.tag('</span>')
}

/**
 * @this {import('micromark-util-types').CompileContext}
 * @type {import('micromark-extension-directive').Handle}
 * @returns {undefined}
 */
function shake(d) {
  if (d.type !== 'textDirective' && d.type !== 'containerDirective') return false

  this.tag('<span class="vac-effects-shake">')

  const target = d.content ?? d.label
  const encodedText = this.encode(target)

  const letterArray = [...encodedText]

  letterArray.forEach(letter => {
    const delay = (-Math.random()).toString()
    this.tag('<span class="vac-effects-shake-letter" style="animation-delay: ' + delay + 's;">')
    this.raw(letter)
    this.tag('</span>')
  })

  this.tag('</span>')
}
