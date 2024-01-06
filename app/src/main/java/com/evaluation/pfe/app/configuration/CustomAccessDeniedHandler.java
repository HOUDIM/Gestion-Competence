package com.evaluation.pfe.app.configuration;

import lombok.*;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@Getter
@Setter
@ToString
class CustomAccessDeniedHandler implements AccessDeniedHandler {
    public CustomAccessDeniedHandler() {
    }

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response,
                       AccessDeniedException exc) throws IOException {
        response.addHeader("access_denied_reason", "not_authorized");
        response.sendError(403, "Access Denied");
        response.setStatus(403);
    }
}
