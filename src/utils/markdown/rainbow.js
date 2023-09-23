/**
 * @this {import('micromark-util-types').CompileContext}
 * @type {import('micromark-extension-directive').Handle}
 * @returns {undefined}
 */
export const rainbow = (d) => {
  if (d.type !== 'textDirective') return false

  this.tag('<span class="vac-effects-rainbow">')
  this.raw(this.encode(d.label))
  this.tag('</span>')
}
