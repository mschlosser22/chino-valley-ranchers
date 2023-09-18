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
      <div className='pt-20 px-8 prose'>
      <b>Privacy Policy for ChinoValleyRanchers.com</b>
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
<p>We use cookies and similar tracking technologies to enhance your experience on our Website. Cookies are small files that are stored on your device's browser. They help us analyze website traffic, remember your preferences, and improve our services. You can control cookies through your browser settings, but disabling cookies may impact your experience on our Website.</p>

<b>5. Third-Party Sharing</b>
<p>We may share your personal information with trusted third parties to fulfill orders, provide services, or analyze Website usage. These third parties are contractually obligated to protect your information and use it only for the purposes specified by us.</p>

<b>6. Data Security</b>
<p>We implement reasonable security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no data transmission over the internet or electronic storage is entirely secure, and we cannot guarantee the security of your information.</p>

<b>7. Your Choices</b>
<p>You have the right to:</p>
<p>Opt out of receiving promotional emails</p>
<p>Delete your account and personal data (subject to legal obligations)</p>
<p>Upon request, we will provide a full description of all information which has been obtained through the Website. If you have any questions or believe we have misused your information, please contact us immediately.</p>

<b>8. Children's Privacy</b>
<p>Our Website is not intended for children under the age of 13. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us to have it removed.</p>

<b>9. Changes to this Privacy Policy</b>
<p>We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will post the updated Privacy Policy on the Website and indicate the effective date.</p>

<b>10. Do Not Track</b>

<p>The California Business & Professions Code provides California residents with the right to know how a website tracks and responds to "Do Not Track" server settings. ("DNT").   As you may know, your browser software should contain an option which, if activated, sends the Website a notice that your information is not tracked.  We do not track or otherwise engage with DNT signals.</p>

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