import { useEffect } from "react"
import { useCMS, usePlugins } from "tinacms"
import { useRouter } from "next/router"
import slugify from "slugify"
import { FORM_ERROR } from "final-form"

import { JsonFile } from 'next-tinacms-json'
import { removeInvalidChars } from "../utils/removeInvalidChars"

const useCreateRecipeArticle = () => {
  //console.log(allArticles)
  const router = useRouter()
  const cms = useCMS()

  const github = cms.api.github

  /* react-tinacms-editor loads CodeMirror, which touches `document` when it is
     required. Importing it here ran that during SSR and broke the pages that
     use this hook. It is only needed inside the CMS, so it is registered in
     the browser once editing is enabled. */
  useEffect(() => {
    if (!cms.enabled) return
    let cancelled = false
    import("react-tinacms-editor").then(({ HtmlFieldPlugin }) => {
      if (!cancelled) cms.plugins.add(HtmlFieldPlugin)
    })
    return () => {
      cancelled = true
    }
  }, [cms.enabled])

  usePlugins([
    {
      __type: "content-creator",
      name: "Create a Recipe",
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
            name: 'videoSrc',
            label: "Video Source",
            component: "text",
            description: "Youtube Embed Code",
            placeholder: "8bwlPZ8FfBs"
        },
        {
            name: "category",
            label: "Category",
            component: "select",
            options: [
                'recipe-video',
                'recipe-article'
            ]
        },
        {
            name: 'tags',
            label: 'Tags',
            component: 'tags',
            description: 'Use: breakfast, lunch, or dinner tags only. Space to add tag.'
        },
        {
            name: 'buttonText',
            label: "Recipe Button Text",
            component: 'text'
        },
        {
            label: 'Recipe Card Image',
            name: 'recipeCardImage',
            component: 'image',
            parse: media => `/images/${media.filename}`,
            uploadDir: () => '/images',
        },
        {
            name: "content",
            label: "Content",
            component: "html"
        }
      ],
      onSubmit: async (frontMatter) => {
        const slug = removeInvalidChars(slugify(frontMatter.title, { lower: true }))
        const fileRelativePath = `content/recipes/${slug}.json`
        const testFileContent = {
            title: frontMatter.title,
            slug: slug,
            image: {
                src: frontMatter.src,
                alt: frontMatter.alt
            },
            video: {
                code: frontMatter.videoSrc
            },
            button: {
                text: frontMatter.buttonText,
                src: frontMatter.recipeCardImage
            },
            category: frontMatter.category,
            tags: frontMatter.tags,
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
            setTimeout(() => router.push(`/recipes`), 1500)
          })
          .catch((e) => {
            return { [FORM_ERROR]: e }
          })
      },
    },
  ])
}

export default useCreateRecipeArticle