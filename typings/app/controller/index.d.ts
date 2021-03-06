// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportArticle from '../../../app/controller/article';
import ExportJournal from '../../../app/controller/journal';
import ExportSignin from '../../../app/controller/signin';
import ExportSignup from '../../../app/controller/signup';
import ExportUser from '../../../app/controller/user';
import ExportVideo from '../../../app/controller/video';

declare module 'egg' {
  interface IController {
    article: ExportArticle;
    journal: ExportJournal;
    signin: ExportSignin;
    signup: ExportSignup;
    user: ExportUser;
    video: ExportVideo;
  }
}
