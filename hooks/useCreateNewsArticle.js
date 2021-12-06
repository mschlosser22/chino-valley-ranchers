import { useCMS, usePlugins } from "tinacms"
import { useRouter } from "next/router"
import slugify from "slugify"
import { FORM_ERROR } from "final-form"
import { HtmlFieldPlugin } from "react-tinacms-editor"
import { DateFieldPlugin } from 'react-tinacms-date'

import { JsonFile } from 'next-tinacms-json'
import { removeInvalidChars } from "../utils/removeInvalidChars"

const useCreateNewsArticle = () => {
  //console.log(allArticles)
  const router = useRouter()
  const cms = useCMS()

  const github = cms.api.github

  usePlugins([
      HtmlFieldPlugin,
      DateFieldPlugin,
    {
      __type: "content-creator",
      name: "Create a News Article",
      fields: [
        {
          name: "title",
          label: "Title",
          component: "text",
          required: true,
          validate(value, allValues, meta, field) {
            if (!value) {
              return "A title is required"
            }
          },
        },
        {
            label: 'Image',
            name: 'src',
            component: 'image',
            parse: media => `/images/${media.filename}`,
            uploadDir: () => '/images',
        },
        {
            label: 'Image Alt Text',
            name: 'alt',
            component: 'text',
        },
        {
            name: "content",
            label: "Content",
            component: "html"
        },
        {
          name: 'date',
          label: 'Publish Date',
          component: 'date',
          dateFormat: 'MMMM DD YYYY',
          timeFormat: false
        }
      ],
      onSubmit: async (frontMatter) => {
        //console.log(cms)
        //const github = cms.api.github
        const slug = removeInvalidChars(slugify(frontMatter.title, { lower: true }))
        //console.log(slug)
        const fileRelativePath = `content/news/${slug}.json`
        //console.log(fileRelativePath)
        const testFileContent = {
            title: frontMatter.title,
            slug: slug,
            image: {
                src: frontMatter.src,
                alt: frontMatter.alt
            },
            date: Date.now(),
            author: "Chino Valley Ranchers",
            content: frontMatter.content
        }

        return await github
          .commit(
            fileRelativePath,
            null,
            JSON.stringify(testFileContent),
            "Update from TinaCMS"
          )
          .then((response) => {
            setTimeout(() => router.push(`/news`), 1500)
          })
          .catch((e) => {
            return { [FORM_ERROR]: e }
          })
      },
    },
  ])
}

export default useCreateNewsArticle