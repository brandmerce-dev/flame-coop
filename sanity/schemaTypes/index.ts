import { siteSettings } from './singletons/siteSettings'
import { navigation }   from './singletons/navigation'
import { homepage }     from './singletons/homepage'
import { about }        from './singletons/about'
import { beliefs }      from './singletons/beliefs'
import { admissions }   from './singletons/admissions'
import { tuition }      from './singletons/tuition'
import { programs }     from './singletons/programs'
import { program }      from './collections/program'
import { subject }      from './collections/subject'
import { legalPage }    from './collections/legalPage'

export const schemaTypes = [
  // Singletons
  siteSettings,
  navigation,
  homepage,
  about,
  beliefs,
  admissions,
  tuition,
  programs,
  // Collections
  program,
  subject,
  legalPage,
]
