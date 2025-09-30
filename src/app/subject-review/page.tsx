'use client'
import { useAuth } from "@/firebase/useAuth"
import { useTranslation } from "@/hooks/useTranslation"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

const SubjectReview = () => {
    const router = useRouter()
    const {t} = useTranslation()
    const {user} = useAuth()
  return (
    <div className="">
        <button className="text-primary cursor-pointer font-bold flex items-center gap-2" onClick={() => {
            user && user.role === "admin" ? router.push('/admin/dashboard/') : router.back()
        }}>
            <ArrowLeft/>{t('admin.articles.msg2')}</button>

            <div className="h-[70vh] max-w-3xl mx-auto flex text-center justify-center items-center text-xl">
           {t('project.underReview')}
            </div>
    </div>
  )
}

export default SubjectReview