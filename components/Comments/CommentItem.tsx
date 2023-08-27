/* eslint-disable @next/next/no-img-element */
import Comment from "@/interfaces/comment";
import React from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import dayjs from "dayjs";
type Props = {
  comment: Comment;
};

export default function CommentItem({ comment }: Props) {
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <article className="p-6 mb-6 text-base rounded-lg bg-gray-900">
        <footer className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <p className="inline-flex items-center mr-3 text-sm text-white">
              <img
                className="mr-2 w-6 h-6 rounded-full"
                src="/gamer.png"
                alt={comment?.user?.username}
              />
              {comment?.user?.username}
            </p>
            <p className="text-sm text-gray-400">
              <time dateTime="2022-02-08" title="February 8th, 2022">
               {dayjs(comment.created_at).format("DD/MM/YYYY HH:mm:ss")}
              </time>
            </p>
          </div>
          <Menu as="div" className="relative inline-flex text-end">
            <div>
              <Menu.Button className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 rounded-lg focus:ring-4 focus:outline-none bg-gray-900 hover:bg-gray-700 focus:ring-gray-600">
              <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
            </svg>
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Edit
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Remove
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        
        </footer>
        <p className="text-gray-400">{comment.commentary}</p>
      </article>
    </>
  );
}
