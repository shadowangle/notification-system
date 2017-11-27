var google = require('googleapis');

google.auth.getApplicationDefault((...prop) => console.log(prop))

// function auth(callback) {
//   google.auth.getApplicationDefault(function(err, authClient) {
//     if (err) {
//       return callback(err);
//     }

//     // The createScopedRequired method returns true when running on GAE or a
//     // local developer machine. In that case, the desired scopes must be passed
//     // in manually. When the code is  running in GCE or GAE Flexible, the scopes
//     // are pulled from the GCE metadata server.
//     // See https://cloud.google.com/compute/docs/authentication for more
//     // information.
//     if (authClient.createScopedRequired && authClient.createScopedRequired()) {
//         // console.log(authClient)
//       // Scopes can be specified either as an array or as a single,
//       // space-delimited string.
//       authClient = authClient.createScoped([
//         'https://www.googleapis.com/auth/prediction',
//       ]);
//     }
//     callback(null, authClient);
//   });
// }

// /**
//  * @param {string} phrase The phrase for which to predict sentiment,
//  * e.g. "good morning".
//  * @param {Function} callback Callback function.
//  */
// function predict(phrase, callback) {
//   auth(function(err, authClient) {
//     //   console.log(authClient)
//     // if (err) {
//     //   return callback(err);
//     // }
//     // console.log(google.prediction({
//     //     version: 'v1.6',
//     //     auth: authClient,
//     //   }))
// //     var hostedmodels = google.prediction({
// //       version: 'v1.6',
// //       auth: authClient,
// //     }).hostedmodels;


// //     // Predict the sentiment for the provided phrase
// //     hostedmodels.predict(
// //       {
// //         // Project id used for this sample
// //         project: '414649711441',
// //         hostedModelName: 'sample.sentiment',
// //         resource: {
// //           input: {
// //             // Predict sentiment of the provided phrase
// //             csvInstance: phrase.split(/\s/gi),
// //           },
// //         },
// //       },
// //       function(err, prediction) {
// //         if (err) {
// //           return callback(err);
// //         }

// //         // Received prediction result
// //         console.log(`Sentiment for "${phrase}": ${prediction.outputLabel}`);
// //         callback(null, prediction);
// //       }
// //     );
//   });
// }

// console.log(predict('aaa'))