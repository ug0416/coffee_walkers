import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { stringify } from 'qs'
import { serialize } from 'dom-form-serializer'

import './Form.css'

class Form extends React.Component {
  static defaultProps = {
    name: 'Simple Form Ajax',
    subject: '', // optional subject of the notification email
    action: '',
    successMessage: 'お問い合わせありがとうございます。確認次第、ご連絡いたします。',
    errorMessage:
      '問題が発生しました。メッセージが送信されていませんので、Eメールでお問い合わせください。'
  }

  state = {
    alert: '',
    disabled: false
  }

  handleSubmit = e => {
    e.preventDefault()
    if (this.state.disabled) return

    const form = e.target
    const data = serialize(form)
    this.setState({ disabled: true })
    fetch(form.action + '?' + stringify(data), {
      method: 'POST'
    })
      .then(res => {
        if (res.ok) {
          return res
        } else {
          throw new Error('Network error')
        }
      })
      .then(() => {
        form.reset()
        this.setState({
          alert: this.props.successMessage,
          disabled: false
        })
      })
      .catch(err => {
        console.error(err)
        this.setState({
          disabled: false,
          alert: this.props.errorMessage
        })
      })
  }

  render() {
    const { name, subject, action } = this.props

    return (
      <Fragment>
        <Helmet>
          <script src="https://www.google.com/recaptcha/api.js" />
        </Helmet>
        <form
          className="Form"
          name={name}
          action={action}
          onSubmit={this.handleSubmit}
          data-netlify="true"
          netlify-recaptcha=""
        >
          {this.state.alert && (
            <div className="Form--Alert">{this.state.alert}</div>
          )}
          <div className="Form--Group">
            <label className="Form--Label">
              <input
                className="Form--Input Form--InputText"
                type="text"
                placeholder="Firstname"
                name="firstname"
                required
              />
              <span>名前</span>
            </label>
            <label className="Form--Label">
              <input
                className="Form--Input Form--InputText"
                type="text"
                placeholder="Lastname"
                name="lastname"
                required
              />
              <span>フリガナ</span>
            </label>
          </div>
          <fieldset>
            <label className="Form--Label Form--Radio">
              <input
                className="Form--RadioInput"
                type="radio"
                name="gender"
                value="male"
                defaultChecked
              />
              <span>男性</span>
            </label>
            <label className="Form--Label Form--Radio">
              <input
                className="Form--RadioInput"
                type="radio"
                name="gender"
                value="female"
              />
              <span>女性</span>
            </label>
          </fieldset>
          <label className="Form--Label">
            <input
              className="Form--Input Form--InputText"
              type="email"
              placeholder="Email"
              name="emailAddress"
              required
            />
            <span>メールアドレス</span>
          </label>
          <label className="Form--Label has-arrow">
            <select
              className="Form--Input Form--Select"
              name="type"
              defaultValue="Type of Enquiry"
              required
            >
              <option disabled hidden>
                問い合わせ内容
              </option>
              <option>掲載情報の修正</option>
              <option>不具合報告</option>
              <option>掲載削除希望</option>
            </select>
          </label>
          <label className="Form--Label">
            <textarea
              className="Form--Input Form--Textarea Form--InputText"
              placeholder="Message"
              name="message"
              rows="10"
              required
            />
            <span>メッセージ</span>
          </label>
          <label className="Form--Label Form-Checkbox">
            <input
              className="Form--Input Form--Textarea Form--CheckboxInput"
              name="newsletter"
              type="checkbox"
            />
            <span>最新情報を受け取る</span>
          </label>
          <div
            className="g-recaptcha"
            data-sitekey="6LfM-BUcAAAAAE-dG4g2bEX6OxA-WLy8xnFLJcxh"
          />
          {!!subject && <input type="hidden" name="subject" value={subject} />}
          <input type="hidden" name="form-name" value={name} />
          <input
            className="Button Form--SubmitButton"
            type="submit"
            value="送信"
            disabled={this.state.disabled}
          />
        </form>
      </Fragment>
    )
  }
}

export default Form
