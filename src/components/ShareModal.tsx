'use client'

import * as React from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Copy, Facebook, Linkedin, Share2, Twitter } from "lucide-react"
import { toast } from 'sonner'

interface ShareModalProps {
  url: string
  title: string
}

export const ShareModal: React.FC<ShareModalProps> = ({ url, title }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url)
    toast.success("Link copied to clipboard!")
  }

  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, "_blank")
  }

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank")
  }

  const shareToLinkedIn = () => {
    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, "_blank")
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline"><Share2 className="h-4 w-4"/> Share</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md border-hidden">
        <DialogHeader>
          <DialogTitle>Share this article</DialogTitle>
        </DialogHeader>
        <div className="flex flex-wrap gap-3 mt-4">
          <Button onClick={copyToClipboard}  className="cursor-pointer hover:text-secondary hover:bg-transparent text-secondary bg-transparent border border-secondary flex items-center">
            <Copy className="h-4 w-4 " />
            <span className='text-sm'>copy link</span>
          </Button>
          <Button onClick={shareToTwitter} className="cursor-pointer hover:text-secondary hover:bg-transparent flex items-center  bg-transparent border border-secondary text-secondary">
            <Twitter className="h-4 w-4" />
            <span className='text-sm'>Twitter</span>
          </Button>
          <Button onClick={shareToFacebook} className="cursor-pointer hover:text-secondary hover:bg-transparent flex items-center  bg-transparent border border-secondary text-secondary">
            <Facebook className="h-4 w-4" />
            <span className='text-sm'>Facebook</span>
          </Button>
          <Button onClick={shareToLinkedIn} className="cursor-pointer hover:text-secondary hover:bg-transparent flex items-center  bg-transparent border border-secondary text-secondary">
            <Linkedin className="h-4 w-4" />
            <span className='text-sm'>LinkedIn</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
