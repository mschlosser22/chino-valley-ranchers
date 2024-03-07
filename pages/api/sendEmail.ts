import { IncomingForm } from 'formidable';
import { Directus } from '@directus/sdk';
import FormData from 'form-data';
import fs from 'fs';

export const config = {
    api: {
        bodyParser: false,
    }
}

export default async function upload(req, res) {
    if (req.method === 'POST') {

      const form = new IncomingForm({ multiples: true});
        form.parse(req, async (err, fields, files) => {

            // parse the form fields
            let { firstName, lastName, phoneNumber, email, job } = fields;


            // make sure the fields first_name, last_name, phone_number, email, and job are strings and not arrays of strings
            firstName = firstName[0];
            lastName = lastName[0];
            phoneNumber = phoneNumber[0];
            email = email[0];
            job = job[0];

            // Extract the file
            const resume = files.resume[0];
            resume.type = 'application/pdf';
            console.log('Resume', resume);
            //const buffer = fs.readFileSync(resume);
            //console.log('Buffer', buffer);

            const directus = new Directus('http://cvr-env.eba-9mnyasfs.us-west-2.elasticbeanstalk.com', {
              auth: {
                staticToken: 'X7M4R7cSKmmCHbF8aPaCM0hONDqiwUIR', // If you want to use a static token, otherwise check below how you can use email and password.
              },
            });

            const response = await directus.files.createOne(
              resume,
              {},
              {
                requestOptions: {
                  headers: {
                    //'type': 'application/pdf',
                  },
                },
              }
            );

            if (response.ok) {
              console.log('File uploaded successfully!');
            } else {
              console.log('Error uploading file:', response.error);
            }

            const body = {
              first_name: firstName,
              last_name: lastName,
              phone: phoneNumber,
              email: email,
              job: job
            };

            // At this point, you could store the received information into your database
            // and the file to a cloud storage service or your file system,
            // based on the needs of your application.

            // Create the lead in Directus
            const options = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer X7M4R7cSKmmCHbF8aPaCM0hONDqiwUIR`
              },
              body: JSON.stringify(body)
            };
            const res = await fetch(
              `http://cvr-env.eba-9mnyasfs.us-west-2.elasticbeanstalk.com/items/opportunities`,
              options
            );

            // get data from response
            const data = await res.json();

            return res.status(200).json({ message: "Successfully uploaded file and received fields" });
        });
    } else {
        res.status(405).json({ error: "Method not allowed, expected POST" });
    }
}
