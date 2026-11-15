import { useParams } from 'react-router-dom';
import { vocabularyApi } from '../api';
import AppShell from '../layouts/AppShell';
import VocabularyForm from '../components/VocabularyForm';
import PageState from '../components/PageState';
import useApi from '../lib/useApi';

export default function EditVocabularyPage() {
  const { id = '' } = useParams();
  const state = useApi(async () => {
    const [vocab, progress] = await Promise.all([vocabularyApi.get(id), vocabularyApi.progress(id)]);
    return {
      vocab,
      inMyList: progress.inMyList,
      canEditShared: progress.canEditShared,
      otherLearners: progress.otherLearners,
      personal: progress.userVocabulary
        ? { note: progress.userVocabulary.note, mnemonic: progress.userVocabulary.mnemonic }
        : { note: null, mnemonic: null },
    };
  }, [id]);
  return (
    <AppShell>
      <PageState state={state}>
        {(d) => (
          <VocabularyForm
            key={id}
            initial={d.vocab}
            personal={d.personal}
            inMyList={d.inMyList}
            canEditShared={d.canEditShared}
            otherLearners={d.otherLearners}
            onChanged={state.reload}
          />
        )}
      </PageState>
    </AppShell>
  );
}
