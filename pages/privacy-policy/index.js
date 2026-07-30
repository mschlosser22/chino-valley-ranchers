import Head from 'next/head'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { Nav } from '../../components/Nav'
import { Footer } from '../../components/footer/Footer'

export default function Products({ file}) {

  return (
    <>
    <div className={`relative`}>
      <Head>
        <title>{file.data.title ? file.data.title : 'Chino Valley Ranchers'}</title>
        <meta name="description" content={file.data.meta && file.data.meta.excerpt ? file.data.meta.excerpt.replace(/(<([^>]+)>)/gi, "") : "Chino Valley Ranchers"}></meta>
        <meta name="keywords" content={file.data.meta && file.data.meta.keywords && file.data.meta.keywords.length > 0 ? file.data.meta.keywords.join() : "chino valley ranchers,cvr,omelette,eggs,breakfast ideas,recipes" }></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />
      <div className='pt-20 pb-12 xl:pt-48 px-8 prose mx-auto'>
      <b>Privacy Policy for ChinoValleyRanchers.com</b><br />
<p><i>Last updated: July 30, 2026</i></p>
<b>1. Introduction</b>
<p>Welcome to Chino Valley Ranchers ("we," "us," or "our"). We are committed to safeguarding the privacy of our website visitors and users. This Privacy Policy outlines how we collect, use, disclose, and protect your personal information when you interact with our website, chinovalleyranchers.com (the "Website"). By using the Website, you agree to the practices described in this Privacy Policy.</p>

<b>2. Information We Collect</b>
<p>We may collect personal information from you when you visit our Website, sign up for our newsletter, fill out a contact form, or place an order. The types of personal information we may collect include:</p>
<p>Name</p>
<p>Contact information, including email address and phone number</p>
<p>Demographic information</p>
<p>Order and transaction details</p>
<p>Website usage data, such as IP address, browser type, and referring pages</p>


<b>3. How We Use Your Information</b>
<p>We use your personal information for various purposes, including but not limited to:</p>
<p>Providing and improving our products and services</p>
<p>Responding to your inquiries and requests</p>
<p>Sending promotional emails and newsletters (you can opt out at any time)</p>
<p>Analyzing and improving our Website's performance and user experience</p>
<p>Complying with legal obligations</p>

<b>4. Cookies and Tracking Technologies</b>
<p>We use cookies and similar tracking technologies on our Website. Cookies are small files stored on your device's browser.</p>

<p><b>We ask for your consent before any non-essential cookie is set.</b> When you first visit the Website, a banner lets you accept all cookies, reject all non-essential cookies, or choose by category. Until you make a choice, no analytics or marketing technologies run and no data is sent to those third parties. You can change or withdraw your choice at any time using the "Manage Cookies" link in the Website footer.</p>

<p>We group cookies into three categories:</p>

<p><b>Strictly necessary</b> &mdash; required for the Website to function, including remembering your cookie choice and keeping forms secure. These are never used for tracking or advertising and cannot be switched off.</p>

<p><b>Analytics</b> &mdash; Google Analytics, which helps us understand which pages visitors find useful so we can improve the Website. These run only if you allow them.</p>

<p><b>Marketing and embedded media</b> &mdash; Google advertising technologies and embedded video players (including YouTube and Meta/Facebook advertising technologies delivered through our tag manager). These run only if you allow them. If you decline, embedded videos display a placeholder and load only when you click to play them.</p>

<p>Our store finder is provided by Destini and is treated as a necessary service on that page: it may set cookies from destinilocators.com so the map and your search results work. This is disclosed on the store locator page itself.</p>

<p>You can also control cookies through your browser settings, though disabling cookies may impact your experience on our Website.</p>

<b>5. Third-Party Sharing</b>
<p>We may share your personal information with trusted third parties to fulfill orders, provide services, or analyze Website usage. These third parties are contractually obligated to protect your information and use it only for the purposes specified by us.</p>

<b>6. Data Security</b>
<p>We implement reasonable security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no data transmission over the internet or electronic storage is entirely secure, and we cannot guarantee the security of your information.</p>

<b>7. Your Choices</b>
<p>You have the right to:</p>
<p>Accept or decline analytics and marketing cookies when you first visit, and change or withdraw that choice at any time through the "Manage Cookies" link in the Website footer</p>
<p>Opt out of receiving promotional emails</p>
<p>Delete your account and personal data (subject to legal obligations)</p>
<p>Upon request, we will provide a full description of all information which has been obtained through the Website. If you have any questions or believe we have misused your information, please contact us immediately.</p>

<b>8. Children's Privacy</b>
<p>Our Website is not intended for children under the age of 13. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us to have it removed.</p>

<b>9. Changes to this Privacy Policy</b>
<p>We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will post the updated Privacy Policy on the Website and indicate the effective date.</p>

<b>10. Do Not Track</b>

<p>The California Business &amp; Professions Code provides California residents with the right to know how a website tracks and responds to "Do Not Track" server settings ("DNT"). Your browser software may contain an option which, if activated, sends the Website a notice that your information is not to be tracked.</p>

<p>There is no consensus industry standard for how websites should respond to DNT browser signals, and our Website does not currently respond to them. Instead, we ask every visitor directly: no analytics or marketing technology runs on this Website until you make a choice using our cookie banner, and declining is as straightforward as accepting. You can change or withdraw that choice at any time through the "Manage Cookies" link in the footer, which we consider a clearer and more reliable control than a browser signal.</p>

<b>11. Contact Us</b>
<p>If you have questions, concerns, or requests related to this Privacy Policy, please contact us at:</p>


<p>CHINO VALLEY RANCHERS</p>
<p>331 W. CITRUS STREET, COLTON, CA 92324</p>
<p>(800) 354-4503</p>
<p>info@ChinoValleyRanchers.com</p>

<p>Thank you for visiting chinovalleyranchers.com. Your privacy is important to us.</p>

</div>
    </div>
    <Footer />
    </>
  )
}

export const getStaticProps = async function({
    preview,
    previewData,
  }) {

    if (preview) {
      return getGithubPreviewProps({
      ...previewData,
      fileRelativePath: 'content/about-feed/index.json',
      parse: parseJson,
      isPreview: true
      })
    }

    return {
      props: {
        sourceProvider: null,
        error: null,
        preview: false,
        file: {
          fileRelativePath: 'content/about-feed/index.json',
          data: (await import('../../content/about-feed/index.json')).default,
        }
      },
    }

  }