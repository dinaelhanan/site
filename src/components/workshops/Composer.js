import styled from 'styled-components'
import React, { Component } from 'react'
import { Input, theme } from '@hackclub/design-system'
import MarkdownBody from 'components/MarkdownBody'
import Editor from 'draft-js-plugins-editor'
import Prism from 'prismjs'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import createMarkdownPlugin from 'draft-js-markdown-plugin'
import createCodeEditorPlugin from 'draft-js-code-editor-plugin'
import createPrismPlugin from 'draft-js-prism-plugin'
import { mdToDraftjs, draftjsToMd } from 'draftjs-md-converter'
import { isEmpty } from 'lodash'

const LangField = styled(Input.withComponent('select'))`
  line-height: 1;
  font-size: ${theme.fontSizes[1]}px;
  padding: 0 ${theme.space[2]}px;
  margin-top: ${theme.space[2]}px;
  margin-bottom: -${theme.space[1]}px;
  max-width: 10rem;
`

const renderLanguageSelect = ({ options, onChange, selectedValue }) => (
  <LangField type="select" value={selectedValue} onChange={onChange}>
    {options.map(({ label, value }) => (
      <option key={value} value={value} children={label} />
    ))}
  </LangField>
)

const Body = styled(MarkdownBody)`
  .DraftEditor-editorContainer > div {
    min-height: 4rem;
  }
`

const plugins = [
  createMarkdownPlugin({ renderLanguageSelect }),
  createPrismPlugin({ prism: Prism }),
  createCodeEditorPlugin()
]

export const LS_BODY_KEY = 'new-workshop-body'
export const LS_NAME_KEY = 'new-workshop-name'

class Composer extends Component {
  state = {
    body: EditorState.createEmpty(),
    plugins
  }

  componentDidMount() {
    let value = ''
    if (localStorage) {
      try {
        value = localStorage.getItem(LS_BODY_KEY)
      } catch (err) {
        localStorage.removeItem(LS_BODY_KEY)
      }
    }
    if (!isEmpty(value)) {
      const raw = mdToDraftjs(value)
      const body = EditorState.createWithContent(convertFromRaw(raw))
      this.setState({ body })
    }
  }

  onChange = body => {
    const raw = convertToRaw(body.getCurrentContent())
    const md = draftjsToMd(raw)
    if (this.props.onChange) this.props.onChange('body', md)
    if (typeof localStorage !== 'undefined') this.persistData(md)
    this.setState({ body })
  }

  persistData = next => {
    try {
      const stored = localStorage.getItem(LS_BODY_KEY)
      if (isEmpty(next) && !isEmpty(stored)) {
      } else {
        localStorage.setItem(LS_BODY_KEY, next)
      }
    } catch (err) {
      localStorage.removeItem(LS_BODY_KEY)
    }
  }

  render() {
    return (
      <Body mt={2}>
        <Editor
          editorState={this.state.body}
          plugins={this.state.plugins}
          spellCheck={true}
          autoCapitalize="sentences"
          autoComplete="on"
          autoCorrect="on"
          stripPastedStyles={true}
          name="body"
          placeholder="Write in Markdown…"
          {...this.props}
          onChange={this.onChange}
        />
      </Body>
    )
  }
}

export default Composer
